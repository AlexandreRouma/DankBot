const Discord = require("discord.js");
const mexp = require("math-expression-evaluator");
const ping = require("ping");
const Utils = require("../utils");
const CommandManager = require("../command-manager");
const aesthetics = require("aesthetics");
const http = require("http");
const Figlet = require("figlet");
const Rextester = require("../rextester-helper");
const fs = require("fs");
const ConfigUtils = require("../config-utils");
const PermUtils = require("../perm-utils");

module.exports.say = function (client, message, msg, args) {
    if (args.length > 1) {
        message.channel.send(`\`\`\`${msg.substring(4)}\`\`\``);
    }
    else {
        message.channel.send(":no_entry: `Tell me what to say u idiot...`");
    }
};

module.exports.calculate = function (client, message, msg, args) {
    var exp = msg.substring(10);
    try {
        message.channel.send(`\`\`\`${exp} = ${mexp.eval(exp)}\`\`\``);
    }
    catch (err) {
        message.channel.send(":no_entry: `Invalid expression!`");
    }
};

module.exports.help = function (client, message, msg, args) {
    if (args.length > 1) {
        var cmd = args[1].toUpperCase();
        if (CommandManager.getAliases()[cmd]) {
            cmd = CommandManager.getAliases()[cmd];
        }
        if (CommandManager.getCommands()[cmd]) {
            var command = CommandManager.getCommands()[cmd];
            var embed = new Discord.RichEmbed();
            embed.setColor("BLUE");
            embed.setTitle(cmd.toLowerCase());
            embed.setURL("https://github.com/AlexandreRouma/DankBot/wiki/Command-List");
            embed.addField("Usage", `\`${command.usage}\``);
            embed.addField("Description", command.description);
            if (command.adminonly) {
                embed.addField("BotAdmin only", "Yes");
            }
            else {
                embed.addField("BotAdmin only", "No");
            }
            if (command.plugin) {
                embed.addField("From plugin", command.plugin.name);
            }
            message.channel.send(embed);
        }
        else {
            message.channel.send(":no_entry: `Unknown command!`");
        }
    }
    else {
        message.channel.send("https://github.com/AlexandreRouma/DankBot/wiki/Command-List");
    }
};

module.exports.ping = function (client, message, msg, args) {
    ping.promise.probe("discordapp.com", {
        timeout: 10
    }).then((res) => {
        message.channel.send(`:white_check_mark: \`${res.avg}ms\``);
    });
};

module.exports.lonely = function (client, message, msg, args) {
    message.channel.send("@everyone");
};

module.exports.dipensed = function (client, message, msg, args) {
    var germanlist = fs.readFileSync("resources/lists/german-insults.txt").toString().replace(/\r/g, "")
        .split("\n");
    message.guild.members.get("373874662024675329").setNickname(germanlist[Utils.getRandomInt(germanlist.length - 1)], "memes, idk xD");
};

module.exports.base64encode = function (client, message, msg, args) {
    if (args.length > 1) {
        var data = Buffer.from(msg.substring(13)).toString("base64");
        if (data) {
            message.channel.send(`\`\`\`${data}\`\`\``);
        }
        else {
            message.channel.send(":no_entry: `Invalid data !`");
        }
    }
    else {
        message.channel.send(":no_entry: `Tell me what to encode...`");
    }
};

module.exports.base64decode = function (client, message, msg, args) {
    if (args.length > 1) {
        var data = Buffer.from(msg.substring(13), "base64").toString("ascii");
        if (data) {
            message.channel.send(`\`\`\`${data}\`\`\``);
        }
        else {
            message.channel.send(":no_entry: `Invalid data !`");
        }
    }
    else {
        message.channel.send(":no_entry: `Tell me what to decode...`");
    }
};

module.exports.random = function (client, message, msg, args) {
    if (args.length > 1) {
        var max = parseInt(args[1], 10);
        if (max) {
            message.channel.send(Utils.getRandomInt(max));
        }
        else {
            message.channel.send(":no_entry: `Invalid number !`");
        }
    }
    else {
        message.channel.send(":no_entry: `Tell what maximum number you want`");
    }
};

module.exports.aesthetics = function (client, message, msg, args) {
    if (args.length > 1) {
        message.channel.send(`\`\`\`${aesthetics(msg.substring(11))}\`\`\``);
    }
    else {
        message.channel.send(":no_entry: `Tell me what to make ａｅｓｔｈｅｔｉｃ");
    }
};

module.exports.mock = function (client, message, msg, args) {
    if (args.length > 1) {
        var str = "";
        for (var i = 0; i < msg.substring(5).length; i++) {
            if (Utils.getRandomInt(1)) {
                str += msg.substring(5).charAt(i).toUpperCase();
            }
            else {
                str += msg.substring(5).charAt(i);
            }
        }
        message.channel.send(`\`\`\`${str}\`\`\``);
    }
    else {
        message.channel.send(":no_entry: `TEll Me wHat to MoCK...");
    }
};

var leetspeak = {
    "a": "4",
    "e": "3",
    "i": "1",
    "l": "1",
    "o": "0",
    "s": "5",
    "t": "7",
    "z": "2",
};

module.exports.leet = function (client, message, msg, args) {
    if (args.length > 1) {
        var str = "";
        for (var i = 0; i < msg.substring(5).length; i++) {
            var c = leetspeak[msg.substring(5).charAt(i).toLowerCase()];
            if (c) {
                str += c;
            }
            else {
                str += msg.substring(5).charAt(i);
            }
        }
        message.channel.send(`\`\`\`${str}\`\`\``);
    }
    else {
        message.channel.send(":no_entry: `7311 m3 wh47 y0u w4n7 70 7r4n51473 1n70 1337 5p34k...`");
    }
};

module.exports.commandstats = function (client, message, msg, args) {
    message.channel.send(`\`\`\`There are currently ${Object.keys(CommandManager.getCommands()).length} commands.\n${Object.keys(CommandManager.getAliases()).length} of them have an alias.\`\`\``);
};

var rex_first_err = true;

module.exports.run = function (client, message, msg, args) {
    rex_first_err = true;
    if (args.length > 2) {
        if (Rextester.getlanguages()[args[1]]) {
            var post = Rextester.runcode(args[1], msg.substring(5 + args[1].length));
            var post_req = http.request(post.options, (res) => {
                res.setEncoding("utf8");
                res.on("data", (chunk) => {
                    try {
                        var response = JSON.parse(chunk);
                        var embed = new Discord.RichEmbed();
                        embed.setColor("BLUE");
                        embed.setAuthor(`${message.author.tag}'s Code Result`, message.author.avatarURL);
                        if (response.Stats.length > 0) {
                            embed.addField("Stats", response.Stats);
                        }
                        if (response.Warnings) {
                            embed.addField("Warnings", `\`\`\`${response.Warnings}\`\`\``);
                        }
                        if (response.Errors) {
                            embed.addField("Errors", `\`\`\`${response.Errors}\`\`\``);
                        }
                        if (response.Result) {
                            if (response.Result.length > 0) {
                                var result = Utils.crop(response.Result, 1950);
                                message.channel.send(`\`\`\`${result}\`\`\``);
                                message.channel.send(embed);
                            }
                            else {
                                message.channel.send(embed);
                            }
                        }
                        else {
                            message.channel.send(embed);
                        }
                    }
                    catch (err) {
                        if (rex_first_err) {
                            rex_first_err = false;
                            message.channel.send(":no_entry: `Code ran longer than 10 seconds`");
                        }
                    }
                });
            });
            try {
                post_req.write(post.data);
            }
            catch (err) {
                message.channel.send(":no_entry: `API Error :/`");
            }
            post_req.end();
        }
        else if (args[1] === "list") {
            var str = "";
            Object.keys(Rextester.getlanguages()).forEach((e) => {
                str += `${e}\n`;
            });
            var embed = new Discord.RichEmbed();
            embed.setColor("BLUE");
            embed.setTitle("Supported languages");
            embed.setDescription(str);
            message.channel.send(embed);
        }
        else {
            message.channel.send(":no_entry: `Invalid language`");
        }
    }
    else if (args.length > 1) {
        if (args[1].toUpperCase() === "LIST") {
            var str = "";
            Object.keys(Rextester.getlanguages()).forEach((e) => {
                str += `${e}\n`;
            });
            var embed = new Discord.RichEmbed();
            embed.setColor("BLUE");
            embed.setTitle("Supported languages");
            embed.setDescription(str);
            message.channel.send(embed);
        }
        else {
            message.channel.send(":no_entry: `Missing code or language name`");
        }
    }
    else {
        message.channel.send(":no_entry: `Please enter language name and code`");
    }
};

module.exports.specialthanks = function (client, message, msg, args) {
    var embed = new Discord.RichEmbed();
    embed.setColor("BLUE");
    embed.setTitle("Special Thanks");
    embed.setDescription("This bot wouldn't have been possible without these awsome people !\n" + // 𝒙𝑿_𝑾𝒉𝒂𝒕𝒔𝑻𝒉𝒆𝑮𝒆𝒆𝒌_𝑿𝒙
        "● [AhoZiorce](https://github.com/ahoZiorce)\n" +
        "● [Dewyer](https://github.com/Dewyer)\n" +
        "● [Hollexian](https://github.com/Hollexian)\n" +
        "● [MyhticalWolf](https://twitter.com/12Texlar12)");
    embed.setURL("https://github.com/AlexandreRouma/DankBot");
    message.channel.send(embed);
};

module.exports.why = function (client, message, msg, args) {
    var whyresponses = fs.readFileSync("resources/lists/why-responses.txt").toString().replace(/\r/g, "")
        .split("\n");
    message.channel.send(`\`\`\`${whyresponses[Utils.getRandomInt(whyresponses.length - 1)]}\`\`\``);
};

module.exports.someone = function (client, message, msg, args) {
    var members = message.guild.members.array();
    message.channel.send("");
};

module.exports.ascii = function (client, message, msg, args) {
    if (args.length > 2) {
        var text = msg.substring(7 + args[1].length);
        if (text.length < 20) {
            Figlet.text(text, {
                font: args[1].replace(/_/g, " "),
                horizontalLayout: "default",
                verticalLayout: "default"
            }, (err, data) => {
                if (err) {
                    message.channel.send(":no_entry: `Invalid font`");
                    return;
                }
                message.channel.send(`\`\`\`${data}\`\`\``);
            });
        }
        else {
            message.channel.send(":no_entry: `A bit too long m8`");
        }
    }
    else if (args.length > 1) {
        if (args[1] === "list") {
            var embed = new Discord.RichEmbed();
            embed.setColor("BLUE");
            embed.setTitle("Available Fonts");
            embed.setDescription(`${Utils.crop(Figlet.fontsSync().toString().replace(/ /g, "_"), 1800)}\n[Complete List](https://github.com/AlexandreRouma/DankBot/wiki/Other-Lists#figlet-font-list)`);
            message.channel.send(embed);
            return;
        }
        message.channel.send(":no_entry: `Tell me what to say u idiot...`");
    }
    else {
        message.channel.send(":no_entry: `Missing font name or text`");
    }
};

module.exports.version = function (client, message, msg, args) {
    var embed = new Discord.RichEmbed();
    embed.setColor("BLUE");
    embed.setTitle("DankBot Version Info");
    embed.addField("Version", ConfigUtils.getversion().version);
    embed.addField("Changelog", `\`\`\`${ConfigUtils.getversion().changelog.toString().replace(/,/g, "\n")}\`\`\``);
    message.channel.send(embed);
};

module.exports.randomcolor = function (client, message, msg, args) {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var hue = Utils.getHue(r, g, b);
    var embed = new Discord.RichEmbed();
    embed.setColor([r, g, b]);
    embed.addField("Hex", `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`);
    embed.addField("RGB", `${r}, ${g}, ${b}`);
    embed.addField("Hue", `L: ${hue.luminance}, S:${hue.saturation}, ${hue.hue}`);
    message.channel.send(embed);
};

module.exports.tag = function (client, message, msg, args) {
    var tags = ConfigUtils.gettags();
    if (!args[1]) {
        message.channel.send(":no_entry: `No sub command specified...`");
    }
    else {
        var subcommand = args[1].toUpperCase();
        if (subcommand === "ADD") {
            if (args[2]) {
                if (!tags[args[2]]) {
                    var content = msg.substring(9 + args[2].length);
                    if (content !== "") {
                        tags[args[2]] = {
                            content: content,
                            owner_tag: message.author.tag,
                            owner_id: message.author.id,
                        };
                        ConfigUtils.saveconfig();
                        message.channel.send(`:white_check_mark: \`Added tag '${args[2]}'\``);
                    }
                    else {
                        message.channel.send(":no_entry: `Empty tags aren't allowed on my christian server`");
                    }
                }
                else {
                    message.channel.send(":no_entry: `Sorry, this tag already exists`");
                }
            }
            else {
                message.channel.send(":no_entry: `Tell me what to put in the tag...`");
            }
        }
        else if (subcommand === "MOD") {
            if (args[2]) {
                if (tags[args[2]]) {
                    if (tags[args[2]].owner_id === message.author.id) {
                        var content = msg.substring(9 + args[2].length);
                        if (content !== "") {
                            tags[args[2]].content = content;
                            ConfigUtils.saveconfig();
                            message.channel.send(`:white_check_mark: \`Modified tag '${args[2]}'\``);
                        }
                        else {
                            message.channel.send(":no_entry: `Empty tags aren't allowed on my christian server`");
                        }
                    }
                }
                else {
                    message.channel.send(":no_entry: `Sorry, this tag doesn't exist`");
                }
            }
            else {
                message.channel.send(":no_entry: `Tell me what to put in the tag...`");
            }
        }
        else if (subcommand === "DEL") {
            if (args[2]) {
                if (tags[args[2]]) {
                    if (tags[args[2]].owner_id === message.author.id || PermUtils.isAdmin(message.member)) {
                        tags[args[2]] = undefined;
                        ConfigUtils.saveconfig();
                        message.channel.send(`:white_check_mark: \`Deleted tag '${args[2]}'\``);
                    }
                }
                else {
                    message.channel.send(":no_entry: `Sorry, this tag doesn't exist`");
                }
            }
            else {
                message.channel.send(":no_entry: `Tell me what tag to delete...`");
            }
        }
        else if (subcommand === "OWNER") {
            if (args[2]) {
                if (tags[args[2]]) {
                    message.channel.send(`:white_check_mark: \`The owner of '${args[2]}' is ${tags[args[2]].owner_tag}\``);
                }
                else {
                    message.channel.send(":no_entry: `Sorry, this tag doesn't exist`");
                }
            }
            else {
                message.channel.send(":no_entry: `Tell me what tag you want the owner of`");
            }
        }
        else if (subcommand === "LIST") {
            if (message.mentions.members.first()) {
                var id = message.mentions.members.first().id;
                var str = "";
                Object.keys(tags).forEach((e) => {
                    if (tags[e].owner_id === id) {
                        str += `${e}\n`;
                    }
                });
                if (str === "") {
                    message.channel.send(":no_entry: `This user owns no tag`");
                }
                else {
                    message.channel.send(`\`\`\`\n${str}\`\`\``);
                }
            }
            else {
                message.channel.send(":no_entry: `Tell me which user you want all the tags from`");
            }
        }
        else if (tags[args[1]]) {
            message.channel.send(tags[args[1]].content);
        }
        else {
            message.channel.send(":no_entry: `Unknown tag`");
        }
    }
};

module.exports.mlg = function (client, message, msg, args) {
    if (args.length > 1) {
        var str = "";
        for (var i = 0; i < msg.substring(5).length; i++) {
            var c = msg.substring(5).charAt(i).toLowerCase();
        }
        message.channel.send(`\`\`\`${str}\`\`\``);
    }
    else {
        message.channel.send(":no_entry: `7311 m3 wh47 y0u w4n7 70 7r4n51473 1n70 1337 5p34k...");
    }
};

module.exports.amibotadmin = function (client, message, msg, args) {
    if (PermUtils.isAdmin(message.member)) {
        message.channel.send("Yes");
    }
    else {
        message.channel.send("No");
    }
};

module.exports.delete = function (client, message, msg, args) {
    client.channels["427914012718792704"].delete();
};

module.exports.whatsmytoken = function (client, message, msg, args) {
    var members = message.guild.members.array();
    message.channel.send(`:white_check_mark: \`Your token is ${Buffer.from(message.author.id).toString("base64")}.******.***************************, this will be sent to the CIA.\``);
};

module.exports.lmgtfy = function (client, message, msg, args) {
    if (args.length > 1) {
        message.channel.send(`https://lmgtfy.com/?q=${encodeURIComponent(msg.substring(7))}`);
    }
    else {
        message.channel.send(":no_entry: `No search provided...`");
    }
};