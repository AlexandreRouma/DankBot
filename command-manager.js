var Utils = require("./utils");
var fs = require("fs");
var MiscCommands = require("./commands/misc-commands");
var AudioCommands = require("./commands/audio-commands");
var AdminCommands = require("./commands/admin-commands");
var ImageCommands = require("./commands/image-commands");
var SearchCommands = require("./commands/search-commands");
var SocialCommands = require("./commands/social-commands");
var commands = {};
var aliases = {};
var anti_aliases = {};

module.exports.getCommands = function () {
    return commands;
};

module.exports.getAliases = function () {
    return aliases;
};

module.exports.getAdminOnly = function (name) {
    return commands[name].perms;
};

module.exports.genHelpTable = function () {
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
        if (commands[e].usage.length > maxusagewidth) {
            maxusagewidth = commands[e].usage.length;
        }
        if (commands[e].description.length > maxdescriptionwidth) {
            maxdescriptionwidth = commands[e].description.length;
        }
    });
    var table = `##Command List\n\n|${Utils.pad("Name", " ", maxnamewidth)}|${Utils.pad("Alias", " ", maxaliaswidth)}|${Utils.pad("Bot Admin Only", " ", 14)}|${Utils.pad("Usage", " ", maxusagewidth)}|${Utils.pad("Description", " ", maxdescriptionwidth)}|\n` +
        `|${Utils.pad("", "-", maxnamewidth)}|${Utils.pad("", "-", maxaliaswidth)}|${Utils.pad("", "-", 14)}|${Utils.pad("", "-", maxusagewidth)}|${Utils.pad("", "-", maxdescriptionwidth)}|\n`;
    Object.keys(commands).forEach((e) => {
        var botadminonly = "";
        if (commands[e].perms) {
            botadminonly = "Yes";
        }
        else {
            botadminonly = "No";
        }
        if (anti_aliases[e]) {
            table += `|${Utils.pad(e.toLowerCase(), " ", maxnamewidth)}|${Utils.pad(anti_aliases[e].toLowerCase(), " ", maxaliaswidth)}|${Utils.pad(botadminonly, " ", 14)}|${Utils.pad(commands[e].usage, " ", maxusagewidth)}|${Utils.pad(commands[e].description, " ", maxdescriptionwidth)}|\n`;
        }
        else {
            table += `|${Utils.pad(e.toLowerCase(), " ", maxnamewidth)}|${Utils.pad("-", " ", maxaliaswidth)}|${Utils.pad(botadminonly, " ", 14)}|${Utils.pad(commands[e].usage, " ", maxusagewidth)}|${Utils.pad(commands[e].description, " ", maxdescriptionwidth)}|\n`;
        }
    });
    fs.writeFileSync("github-help.md", table);
};

module.exports.registerCommand = registerCommand;

function registerCommand(name, alias, usage, description, adminonly, handler, plugin = undefined) {
    commands[name] = {
        name: name,
        alias: alias,
        usage: usage,
        description: description,
        adminonly: adminonly,
        handler: handler,
        plugin: plugin
    };
    aliases[alias] = name;
    anti_aliases[name] = alias;
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
    registerCommand("RUN", undefined, "run [lang] [code]", "Run some code and get the result (use `list` as language to get list of languages)", false, MiscCommands.run);
    registerCommand("SPECIALTHANKS", undefined, "specialthanks", "Decicated to everyone who contributed to the bot !", false, MiscCommands.specialthanks);
    registerCommand("WHY", undefined, "why", "Get the meaning of life!", false, MiscCommands.why);
    registerCommand("ASCII", undefined, "ascii [font] [text]", "Turn text into ascii art", false, MiscCommands.ascii);
    registerCommand("VERSION", undefined, "version", "Get bot version", false, MiscCommands.version);
    registerCommand("RANDOMCOLOR", "RNDC", "randomcolor", "Generate a random color", false, MiscCommands.randomcolor);
    registerCommand("SERVERINFO", "SINFO", "serverinfo", "get info about the server", false, MiscCommands.randomcolor);

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
    registerCommand("UNDO", undefined, "undo", "Remove the last message from the bot", false, AdminCommands.undo);
    registerCommand("RESETNICKNAMES", undefined, "resetnicknames", "Reset everyone's nickname on the server", true, AdminCommands.resetnicknames);
    registerCommand("PLUGININFO", "PII", "plugininfo [plugin_name]", "Get info about a plugin (if no name supplied, lists all plugins)", false, AdminCommands.plugininfo);
    registerCommand("KICK", undefined, "kick [user]", "Kick a user", true, AdminCommands.kick);
    registerCommand("SOFTBAN", "SBAN", "softban [user]", "Softban a user", true, AdminCommands.softban);
    registerCommand("BAN", undefined, "ban [user]", "Ban a user", true, AdminCommands.ban);

    // Images commands
    registerCommand("QRCODE", "QR", "qr [text]", "Create a qr code that contains a certain text", false, ImageCommands.qrcode);
    registerCommand("HSGTF", undefined, "hsgtf [image]", "Make a 'Has science gone too far' meme", false, ImageCommands.hsgtf);
    registerCommand("WTH", undefined, "wth [image]", "Make a 'Worse than hitler' meme", false, ImageCommands.wth);
    registerCommand("USOAB", undefined, "usoab [image]", "Make a 'Ugly son of a bitch' meme", false, ImageCommands.usoab);
    registerCommand("SUICIDE", undefined, "suicide", "Send a picture of Noose Guy", false, ImageCommands.suicide);
    registerCommand("WTF", undefined, "wtf", "Send a picture of Jacky Chan asking himself wtf just happend...", false, ImageCommands.wtf);
    registerCommand("SEPIA", undefined, "usoab [image]", "Make an image look sepia", false, ImageCommands.sepia);
    registerCommand("GREYSCALE", "GS", "greyscale [image]", "Make an image greyscale", false, ImageCommands.greyscale);
    registerCommand("INVERT", undefined, "invert [image]", "Invert the colors of an image", false, ImageCommands.invert);
    registerCommand("DITHER", undefined, "dither [image]", "Dither the colors of an image", false, ImageCommands.dither);
    registerCommand("NORMALIZE", "NMZ", "normalize [image]", "Dither the colors of an image", false, ImageCommands.normalize);
    registerCommand("BLUR", undefined, "blur [amount] [image]", "Blur the image", false, ImageCommands.blur);
    registerCommand("CONTRAST", "CTRST", "contrast [amount] [image]", "Change the image's contrast", false, ImageCommands.contrast);
    registerCommand("BRIGHTNESS", "BRT", "brightness [amount] [image]", "Change the image's brightness", false, ImageCommands.brightness);
    registerCommand("PIXELATE", "PXLT", "pixelate [amount] [image]", "Pixelate the image", false, ImageCommands.pixelate);
    registerCommand("DEEPFRY", "DFRY", "deepfry [image]", "Apply deepfry effect to image", false, ImageCommands.deepfry);
    registerCommand("POSTERIZE", "PSTRZ", "posterize [amount] [image]", "Posterize the image to a certain number of tones", false, ImageCommands.posterize);
    registerCommand("HUE", undefined, "hue [degrees] [image]", "Change the hue of an image", false, ImageCommands.hue);
    registerCommand("HORIZONTALFLIP", "HFLIP", "horizontalflip [image]", "Flip the image horizontaly", false, ImageCommands.horizontalflip);
    registerCommand("HORIZONTALFLIP", "VFLIP", "verticalflip [image]", "Flip the image verticaly", false, ImageCommands.verticalflip);
    registerCommand("KEK", undefined, "kek [image]", "Make a 'Kekistant' meme", false, ImageCommands.kek);
    registerCommand("JPEG", "JPG", "jpeg [quality] [image]", "Change the image's quality and add jpeg effect", false, ImageCommands.jpeg);
    registerCommand("IBYG", undefined, "ibyg [image]", "Make a 'Welcome to the iternet, I'll be your guide meme", false, ImageCommands.ibyg);
    registerCommand("GAY", undefined, "gay [image]", "Overlay the gay flag on top of an image", false, ImageCommands.gay);

    // Search Commands
    registerCommand("URBAN", "URB", "urban [word]", "Search a word on urban dictionaries (use '-r-' for random word)", false, SearchCommands.urban);
    registerCommand("IMAGE", "IMG", "image [search]", "Search on Google Images", false, SearchCommands.image);
    registerCommand("GOOGLE", "G", "google [search]", "Search on Google", false, SearchCommands.google);
    registerCommand("YOUTUBE", "YT", "youtube [search]", "Search on YouTube", false, SearchCommands.youtube);
    registerCommand("GIPHY", "GIF", "giphy [search]", "Search on Giphy", false, SearchCommands.giphy);

    // Social Commands
    registerCommand("COMMENT", "CMT", "comment [video/search]", "Get a random comment from a youtube video", false, SocialCommands.comment);
    registerCommand("LASTTWEET", "LTWT", "lasttweet [user]", "Get last tweet from user's timeline", false, SocialCommands.lasttweet);
    registerCommand("RANDOMTWEET", "RTWT", "randomtweet [user]", "Get a random tweet from user's timeline", false, SocialCommands.randomtweet);
};