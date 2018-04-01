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
}

module.exports.setgame = function (client, message, msg, args) {
    if (args.length > 1) {
        client.user.setActivity(msg.substring(8));
        var config = ConfigUtils.getconfig();
        config.Playing = msg.substring(8);
        ConfigUtils.setconfig(config);
        ConfigUtils.saveconfig();
        message.channel.send(`:white_check_mark: \`Game set to '${msg.substring(8)}'\``);
    }
    else {
        message.channel.send(":no_entry: `Tell me the game I have to play...`");
    }
}

module.exports.setprefix = function (client, message, msg, args) {
    if (args.length > 1) {
        var config = ConfigUtils.getconfig();
        config.Prefix = msg.substring(10);
        ConfigUtils.setconfig(config);
        ConfigUtils.saveconfig();
        message.channel.send(`:white_check_mark: \`Prefix is now '${msg.substring(10)}'\``);
    }
    else {
        message.channel.send(":no_entry: `Tell me the prefix dumbass...`");
    }
}

module.exports.reload = function (client, message, msg, args) {
    ConfigUtils.loadconfig();
    message.channel.send(`:white_check_mark: \`Reloaded the configuration file.\``);
}

module.exports.avatar = function (client, message, msg, args) {
    if (message.mentions.users.array().length > 0) {
        message.channel.send(message.mentions.members.first().user.avatarURL);
    }
    else {
        message.channel.send(":no_entry: `Tell which user to get the avatar from...`");
    }
}

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
        embed.addField("Nickname", nick)
        var game = user.presence.game;
        if (!game) {
            game = "__*none*__";
        }
        embed.addField("Playing", game.name);;
        var roles = ""
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
}

module.exports.undo = function (client, message, msg, args) {
    message.channel.fetchMessages({ limit: 50 })
        .then((_messages) => {
            var messages = _messages.array();
            for (var i = 0; i < messages.length; i++) {
                if (messages[i].author.id == client.user.id) {
                    messages[i].delete();
                    return;
                }
            }
        })
        .catch(console.error)
}

module.exports.resetnicknames = function (client, message, msg, args) {
    var members = message.guild.members.array();
    var i = 0;
    members.forEach((e) => {
        e.setNickname("", "cleanup");
        i++;
    });
    message.channel.send(`:white_check_mark: \`Changed back ${i} nicknames\``);
}

module.exports.plugininfo = function (client, message, msg, args) {
    if (args.length > 1) {
        var plugin_name = args[1].toLowerCase();
        if (PluginManager.getPlugins()[plugin_name]) {
            var plugin = PluginManager.getPlugins()[plugin_name];
            var embed = new Discord.RichEmbed();
            embed.setColor("BLUE");
            embed.setTitle(plugin._plugin_info.name);
            embed.setURL(plugin._plugin_info.url);
            embed.addField("Author", plugin._plugin_info.author);
            embed.addField("Version", plugin._plugin_info.version);
            embed.addField("Description", plugin._plugin_info.description);
            Object.keys(plugin._plugin_info.additional_info).forEach((e) => {
                embed.addField(e, plugin._plugin_info.additional_info[e]);
            })
            message.channel.send(embed);
        }
        else {
            message.channel.send(":no_entry: `Unknown plugin!`")
        }
    }
    else {
        var embed = new Discord.RichEmbed();
        embed.setColor("BLUE");
        embed.setTitle("Plugin List");
        embed.setURL("https://github.com/AlexandreRouma/DankBot/wiki/Plugin-How-To");
        var str = "";
        Object.keys(PluginManager.getPlugins()).forEach((e) => {
            str += e + "\n";
        })
        embed.setDescription(str);
        message.channel.send(embed);
    }
}