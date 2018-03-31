var Utils = require("./utils");
var fs = require("fs");
var MiscCommands = require('./commands/misc-commands');
var AudioCommands = require('./commands/audio-commands');
var AdminCommands = require('./commands/admin-commands');
var ImageCommands = require("./commands/image-commands");
var SearchCommands = require("./commands/search-commands");
var SocialCommands = require("./commands/social-commands");
var commands = {};
var aliases = {};
var anti_aliases = {};
var helps = {};
var perms = {};

module.exports.getCommands = function () {
    return commands;
}

module.exports.getAliases = function () {
    return aliases;
}

module.exports.getHelp = function (name) {
    return helps[name];
}

module.exports.getAdminOnly = function (name) {
    return perms[name];
}

module.exports.genHelpTable = function (name) {
    var maxnamewidth = 4;
    var maxaliaswidth = 5;
    var maxusagewidth = 5;
    var maxdescriptionwidth = 11;
    Object.keys(commands).forEach((e) => {
        if (e.length > maxnamewidth) {
            maxnamewidth = e.length;
        }
        if (anti_aliases[e]) {
            if (anti_aliases[e].length > maxaliaswidth) {
                maxaliaswidth = anti_aliases[e].length;
            }
        }
        if (helps[e].usage.length > maxusagewidth) {
            maxusagewidth = helps[e].usage.length;
        }
        if (helps[e].description.length > maxdescriptionwidth) {
            maxdescriptionwidth = helps[e].description.length;
        }
    });
    var table = `|${Utils.pad("Name", " ", maxnamewidth)}|${Utils.pad("Alias", " ", maxaliaswidth)}|${Utils.pad("Bot Admin Only", " ", 14)}|${Utils.pad("Usage", " ", maxusagewidth)}|${Utils.pad("Description", " ", maxdescriptionwidth)}|\n` +
        `|${Utils.pad("", "-", maxnamewidth)}|${Utils.pad("", "-", maxaliaswidth)}|${Utils.pad("", "-", 14)}|${Utils.pad("", "-", maxusagewidth)}|${Utils.pad("", "-", maxdescriptionwidth)}|\n`;
    
    Object.keys(commands).forEach((e) => {
        var botadminonly = "";
        if (perms[e]) {
            botadminonly = "Yes";
        }
        else {
            botadminonly = "No";
        }
        if (anti_aliases[e]) {
            table += `|${Utils.pad(e.toLowerCase(), " ", maxnamewidth)}|${Utils.pad(anti_aliases[e].toLowerCase(), " ", maxaliaswidth)}|${Utils.pad(botadminonly, " ", 14)}|${Utils.pad(helps[e].usage, " ", maxusagewidth)}|${Utils.pad(helps[e].description, " ", maxdescriptionwidth)}|\n`;
        }
        else {
            table += `|${Utils.pad(e.toLowerCase(), " ", maxnamewidth)}|${Utils.pad("-", " ", maxaliaswidth)}|${Utils.pad(botadminonly, " ", 14)}|${Utils.pad(helps[e].usage, " ", maxusagewidth)}|${Utils.pad(helps[e].description, " ", maxdescriptionwidth)}|\n`;
        }
    });
    fs.writeFileSync("github-help.txt", table);
}

function registerCommand(name, alias, usage, description, adminonly, command) {
    commands[name] = command;
    aliases[alias] = name;
    anti_aliases[name] = alias;
    helps[name] = {
        usage: usage,
        description: description
    };
    perms[name] = adminonly;
}

module.exports.loadCommands = function () {
    // Misc Commands
    registerCommand("SAY", undefined, "say [text]", "Say the entered text", false, MiscCommands.say);
    registerCommand("CALCULATE", "CALC", "calculate [exp]", "Evaluate a math expression", false, MiscCommands.calculate);
    registerCommand("HELP", undefined, "help [command]", "Get help for of command. If now command enter, gives the github wiki link.", false, MiscCommands.help);
    registerCommand("PING", undefined, "ping", "Get the bot ping", false, MiscCommands.ping);
    registerCommand("LONELY", undefined, "lonely", "Say @everyone", true, MiscCommands.lonely);
    registerCommand("DISPENSED", undefined, "dispensed", "Change @TheDispenser's nickname to a random german insult", false, MiscCommands.dipensed);
    registerCommand("BASE64ENCODE", "B64E", "base64encode [text]", "Encode text to base64", false, MiscCommands.base64encode);
    registerCommand("BASE64DECODE", "B64D", "base64decode [text]", "Decode base64 back to text", false, MiscCommands.base64decode);
    registerCommand("RANDOM", "RND", "random [max]", "Choose a nomber randomly between 0 and max", false, MiscCommands.random);
    registerCommand("AESTHETICS", "AES", "aesthetics [text]", "Change text to look aesthetic", false, MiscCommands.aesthetics);
    registerCommand("MOCK", undefined, "mock [text]", "Change random letters to uppercase", false, MiscCommands.mock);
    registerCommand("LEET", undefined, "leet [text]", "Translate text to 1337 5p34k", false, MiscCommands.leet);
    registerCommand("COMMANDSTATS", "CST", "commandstats", "Give stats about the bot's commands", false, MiscCommands.commandstats);
    registerCommand("RUN", undefined, "run [lang] [code]", "Run some code and get the result (use list as language to get list of languages)", false, MiscCommands.run);
    registerCommand("SPECIALTHANKS", undefined, "specialthanks", "Decicated to everyone who contributed to the bot !", false, MiscCommands.specialthanks);
    registerCommand("WHY", undefined, "why", "Get the meaning of life!", false, MiscCommands.why);

    // Audio Commands
    registerCommand("PLAY", undefined, "play [url/search]", "Play a youtube video in the vocal channel you're in", false, AudioCommands.play);
    registerCommand("PAUSE", undefined, "pause", "Pause the currently playing song", false, AudioCommands.pause);
    registerCommand("RESUME", undefined, "resume", "Resume the currently playing song", false, AudioCommands.resume);
    registerCommand("STOP", undefined, "stop", "Stop playing a song and quit audio channel (need vote if not bot admin)", false, AudioCommands.stop);
    registerCommand("SKIP", undefined, "skip", "Skip the currently playing song (need vote if not bot admin)", false, AudioCommands.skip);
    registerCommand("LOOP", undefined, "loop", "Loop the playlist", false, AudioCommands.loop);
    registerCommand("PLAYLIST", "PL", "playlist", "Get the current playlist", false, AudioCommands.playlist);
    registerCommand("SOUNDEFFECT", "SE", "soundeffect [name]", "Play a sound effect in the vocal channel you're in", false, AudioCommands.soundeffect);
    registerCommand("REMOVE", "RM", "loop", "Remove a song from the playlist", false, AudioCommands.remove);

    // Admin Commands
    registerCommand("DUMPROLES", undefined, "dumproles", "Dump all roles on the server", false, AdminCommands.dumproles);
    registerCommand("SETPREFIX", undefined, "setprefix [prefix]", "Set the bot prefix", true, AdminCommands.setprefix);
    registerCommand("SETGAME", undefined, "setgame [game]", "Set the 'playing' text", true, AdminCommands.setgame);
    registerCommand("RELOAD", undefined, "reload", "reload the config file", true, AdminCommands.reload);
    registerCommand("AVATAR", undefined, "avatar [user]", "Get the avatar from a user", false, AdminCommands.avatar);
    registerCommand("USERINFO", undefined, "userinfo [user]", "Get info for a user", false, AdminCommands.userinfo);

    // Images commands
    registerCommand("QRCODE", "QR", "qr [text]", "Create a qr code that contains a certain text", false, ImageCommands.qrcode);

    // Search Commands
    registerCommand("URBAN", "URB", "urban [word]", "Search a word on urban dictionaries (use '-r-' for random word)", false, SearchCommands.urban);
    registerCommand("IMAGE", "IMG", "image [search]", "Search on Google Images", false, SearchCommands.image);
    registerCommand("GOOGLE", "G", "google [search]", "Search on Google", false, SearchCommands.google);
    registerCommand("YOUTUBE", "YT", "youtube [search]", "Search on YouTube", false, SearchCommands.youtube);

    // Social Commands
    registerCommand("COMMENT", "CMT", "comment [video/search]", "Get a random comment from a youtube video", false, SocialCommands.comment);
    registerCommand("LASTTWEET", "LTWT", "lasttweet [user]", "Get last tweet from user's timeline", false, SocialCommands.lasttweet);
    registerCommand("RANDOMTWEET", "RTWT", "randomtweet [user]", "Get a random tweet from user's timeline", false, SocialCommands.randomtweet);
}