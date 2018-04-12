var ConfigUtils = require("../config-utils");
var PermUtils = require("../perm-utils");
var Discord = require("discord.js");
var Jimp = require("jimp");
var PluginManager = require("../plugin-manager");

module.exports.dumproles = function (client, message, msg, args) {
    var str = "";
    message.guild.roles.array().forEach((e) => {
        str += `${e.id} - ${e.name}\n`;
    });
    message.channel.send(`\`\`\`${str}\`\`\``);
};

module.exports.setgame = function (client, message, msg, args) {
    if (args.length > 1) {
        client.user.setActivity(msg.substring(8));
        ConfigUtils.getconfig().Playing = msg.substring(8);
        ConfigUtils.saveconfig();
        message.channel.send(`:white_check_mark: \`Game set to '${msg.substring(8)}'\``);
    }
    else {
        message.channel.send(":no_entry: `Tell me the game I have to play...`");
    }
};

module.exports.setprefix = function (client, message, msg, args) {
    if (args.length > 1) {
        ConfigUtils.getconfig().Prefix = msg.substring(10);
        ConfigUtils.saveconfig();
        message.channel.send(`:white_check_mark: \`Prefix is now '${msg.substring(10)}'\``);
    }
    else {
        message.channel.send(":no_entry: `Tell me the prefix dumbass...`");
    }
};

module.exports.reload = function (client, message, msg, args) {
    ConfigUtils.loadconfig();
    message.channel.send(`:white_check_mark: \`Reloaded the configuration file.\``);
};

module.exports.avatar = function (client, message, msg, args) {
    if (message.mentions.users.array().length > 0) {
        message.channel.send(message.mentions.members.first().user.avatarURL);
    }
    else {
        message.channel.send(":no_entry: `Tell which user to get the avatar from...`");
    }
};

module.exports.userinfo = function (client, message, msg, args) {
    if (message.mentions.users.array().length > 0) {
        var member = message.mentions.members.first();
        var user = member.user;
        var embed = new Discord.RichEmbed();
        embed.setColor("BLUE");
        embed.setThumbnail(user.avatarURL);
        embed.setAuthor(`${user.tag}`, user.avatarURL, user.avatarURL);
        embed.addField("ID", member.id);
        embed.addField("Joined", member.joinedAt.toGMTString());
        embed.addField("Created", user.createdAt.toGMTString());
        var nick = member.nickname;
        if (!nick) {
            nick = "__*none*__";
        }
        embed.addField("Nickname", nick);
        var game = user.presence.game;
        if (!game) {
            game = "__*none*__";
        }
        embed.addField("Playing", game.name);
        var roles = "";
        member.roles.array().forEach((e) => {
            roles += `\`${e.name}\`, `;
        });
        roles = roles.substring(0, roles.length - 2);
        embed.addField("Roles", roles);
        if (user.bot) {
            embed.addField("Is a bot", "Yes");
        }
        else {
            embed.addField("Is a bot", "No");
        }
        embed.setFooter(`Status: ${user.presence.status}`);
        message.channel.send(embed);
    }
    else {
        message.channel.send(":no_entry: `No user mentioned...`");
    }
};

module.exports.undo = function (client, message, msg, args) {
    message.channel.fetchMessages({ limit: 50 })
        .then((_messages) => {
            var messages = _messages.array();
            for (var i = 0; i < messages.length; i++) {
                if (messages[i].author.id === client.user.id) {
                    messages[i].delete();
                    return;
                }
            }
        })
        .catch(console.error);
};

module.exports.resetnicknames = function (client, message, msg, args) {
    var members = message.guild.members.array();
    var i = 0;
    members.forEach((e) => {
        e.setNickname("", "cleanup");
        i++;
    });
    message.channel.send(`:white_check_mark: \`Changed back ${i} nicknames\``);
};

module.exports.plugininfo = function (client, message, msg, args) {
    if (args.length > 1) {
        var plugin_name = args[1].toLowerCase();
        if (PluginManager.getPlugins()[plugin_name]) {
            var plugin = PluginManager.getPlugins()[plugin_name];
            var embed = new Discord.RichEmbed();
            embed.setColor("BLUE");
            embed.setTitle(plugin.name);
            embed.setURL(plugin.url);
            embed.addField("Author", plugin.author);
            embed.addField("Version", plugin.version);
            embed.addField("Description", plugin.description);
            Object.keys(plugin.additional_info).forEach((e) => {
                embed.addField(e, plugin.additional_info[e]);
            });
            var str = "";
            Object.keys(plugin.commands).forEach((e) => {
                str += `${plugin.commands[e].name}\n`;
            });
            if (str !== "") {
                embed.addField("Commands", str.toLowerCase());
            }
            message.channel.send(embed);
        }
        else {
            message.channel.send(":no_entry: `Unknown plugin!`");
        }
    }
    else {
        var embed = new Discord.RichEmbed();
        embed.setColor("BLUE");
        embed.setTitle("Plugin List");
        embed.setURL("https://github.com/AlexandreRouma/DankBot/wiki/Plugin-How-To");
        var str = "";
        Object.keys(PluginManager.getPlugins()).forEach((e) => {
            str += `${e}\n`;
        });
        embed.setFooter(`Plugin count: ${Object.keys(PluginManager.getPlugins()).length}`);
        embed.setDescription(str);
        message.channel.send(embed);
    }
};

module.exports.kick = function (client, message, msg, args) {
    if (message.mentions.members.array().length > 0) {
        var member = message.mentions.members.first();
        try {
            member.kick();
            message.channel.send(`:white_check_mark: \`Kicked ${member.user.tag}\``);
        }
        catch (err) {
            message.channel.send(`:no_entry: \`Sorry, couldn't kick ${member.user.tag}\``);
        }
    }
    else {
        message.channel.send(":no_entry: `No user mentioned...`");
    }
};

module.exports.softban = async function (client, message, msg, args) {
    if (message.mentions.members.array().length > 0) {
        var member = message.mentions.members.first();
        try {
            await member.ban("Boi, u have been softbanned, this means you can immidiatly rejoin, but your messages have been deleted !");
            try {
                await message.guild.unban(member);
                message.channel.send(`:white_check_mark: \`Softbanned ${member.user.tag}\``);
            }
            catch (err) {
                message.channel.send(`:no_entry: \`Sorry, couldn't softban ${member.user.tag}\``);
            }
        }
        catch (e) {
            message.channel.send(`:no_entry: \`Sorry, couldn't softban ${member.user.tag}\``);
        }
    }
    else {
        message.channel.send(":no_entry: `No user mentioned...`");
    }
};

module.exports.ban = async function (client, message, msg, args) {
    if (message.mentions.members.array().length > 0) {
        var member = message.mentions.members.first();
        try {
            await member.ban("Boi, u have been banned !!!");
            message.channel.send(`:white_check_mark: \`Banned ${member.user.tag}\``);
        }
        catch (e) {
            message.channel.send(`:no_entry: \`Sorry, couldn't ban ${member.user.tag}\``);
        }
    }
    else {
        message.channel.send(":no_entry: `No user mentioned...`");
    }
};

module.exports.uptime = function (client, message, msg, args) {
    message.channel.send(`:white_check_mark: \`${client.uptime / 1000}s\``);
};

module.exports.mute = async function (client, message, msg, args) {
    if (message.mentions.members) {
        var config = ConfigUtils.getconfig();
        var member = message.mentions.members.first();
        var role;
        if (config.MuteRole === "INSERT_HERE") {
            role = await message.guild.createRole({
                name: "DankBot_Muted",
            });
            config.MuteRole = role.id;
            ConfigUtils.saveconfig();
        }
        else {
            role = config.MuteRole;
        }
        try {
            await member.addRole(role);
            var channels = message.guild.channels.filterArray((c) => c.type === "text");
            try {
                channels.forEach((c) => {
                    c.overWritePermissions(role, {
                        "SEND_MESSAGES": false,
                        "ADD_REACTIONS": false
                    });
                });
            }
            catch (err) {
                console.error(err);
            }
            message.channel.send(`:white_check_mark: \`Muted ${member.user.tag}\``);
        }
        catch (err) {
            message.channel.send(":no_entry: `I can't add the muted role m8`");
        }
    }
    else {
        message.channel.send(":no_entry: `No user mentioned...`");
    }
};

module.exports.serverinfo = function (client, message, msg, args) {
    var embed = new Discord.RichEmbed();
    embed.setColor("BLUE");
    embed.setAuthor(message.guild.name, message.guild.iconURL);
    embed.setThumbnail(message.guild.iconURL);
    embed.addField("Owner", message.guild.owner.user.tag, true);
    embed.addField("ID", message.guild.id, true);
    embed.addField("Online members", message.guild.members.array().length, true);
    embed.addField("Total members", message.guild.memberCount, true);
    embed.addField("Role count", message.guild.roles.array().length, true);
    var textChannels = 0;
    var vocalChannels = 0;
    var categories = 0;
    message.guild.channels.array().forEach((e) => {
        if (e.type === "text") {
            textChannels++;
        }
        else if (e.type === "voice") {
            vocalChannels++;
        }
        else {
            categories++;
        }
    });
    embed.addField("Categories", categories, true);
    embed.addField("Voice channels", vocalChannels, true);
    embed.addField("Text channels", textChannels, true);
    var roles = "";
    message.guild.roles.array().forEach((e) => {
        roles += `\`${e.name}\`, `;
    });
    roles = roles.substring(0, roles.length - 2);
    embed.addField("Roles", roles);
    message.channel.send(embed);
};