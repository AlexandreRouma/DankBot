const Discord = require("discord.js");
const Art = require("./art");
const Logger = require("./logger");
const ConfigUtils = require("./config-utils");
const PermUtils = require("./perm-utils");
const CommandManager = require("./command-manager");
const fs = require("fs");
const ytsearch = require("youtube-search");
const GoogleImages = require("google-images");
const GoogleSearch = require("google-search");
const Youtube = require("youtube-api");
const Giphy = require("giphy");
const SearchCommands = require("./commands/search-commands");
const MiscCommands = require("./commands/misc-commands");
const AudioCommands = require("./commands/audio-commands");
const SocialCommands = require("./commands/social-commands");
const PluginManager = require("./plugin-manager");
const SelfTest = require("./self-test");
const path = require("path");
const Twitter = require("twitter");
const Utils = require("./utils");

var client = new Discord.Client();
var TEST_MODE = false;

main();
function main() {
    Art.displaySplash();
    if (!fs.existsSync("resources/config/config.json")) {
        Logger.log("Creating configuration file...");
        try {
            if (!fs.existsSync("resources/config/")) {
                fs.mkdirSync("resources/config/");
            }
            ConfigUtils.loaddefault();
            ConfigUtils.saveconfig();
            Logger.ok();
        }
        catch (err) {
            Logger.failed();
            Logger.panic(`Could not create the configuration file: ${err.message}`);
        }
    }

    Logger.log("Loading configuration...");
    try {
        ConfigUtils.loadconfig();
        Logger.ok();
    }
    catch (err) {
        Logger.failed();
        Logger.panic("Could not load the configuration file");
    }

    if (process.argv[2] === "--test") { // Engage test mode
        TEST_MODE = true;
        var config = ConfigUtils.getconfig();
        config.GoogleAPIEnabled = false;
        config.TwitterAPIEnabled = false;
        config.GiphyAPIEnabled = false;
        config.BotAdminRoles[0] = "2222222222222222222";
        ConfigUtils.setconfig(config);
        client = SelfTest.FakeDiscordClient;
        Logger.log("TEST MODE ENABLED !\n");
    }

    if (ConfigUtils.getconfig().TwitterAPIEnabled) {
        Logger.log("Initializing Google Images API...");
        try {
            SearchCommands.initGoogleImages(new GoogleImages(ConfigUtils.getconfig().GoogleSearchEngineID, ConfigUtils.getconfig().GoogleAPIKey));
            Logger.ok();
        }
        catch (err) {
            Logger.failed();
            Logger.panic("Could initialize Google Images API!");
        }

        Logger.log("Initializing Google Search API...");
        try {
            SearchCommands.initGoogleSearch(new GoogleSearch({ key: ConfigUtils.getconfig().GoogleAPIKey, cx: ConfigUtils.getconfig().GoogleSearchEngineID }));
            Logger.ok();
        }
        catch (err) {
            Logger.failed();
            Logger.panic("Could initialize Google Search API!");
        }

        Logger.log("Initializing YouTube API...");
        try {
            Youtube.authenticate({
                type: "key",
                key: ConfigUtils.getconfig().GoogleAPIKey
            });
            AudioCommands.initYoutubeAPIKey(ConfigUtils.getconfig().GoogleAPIKey);
            SearchCommands.initYoutubeAPIKey(ConfigUtils.getconfig().GoogleAPIKey);
            SocialCommands.initYoutubeAPIKey(ConfigUtils.getconfig().GoogleAPIKey);
            Logger.ok();
        }
        catch (err) {
            Logger.failed();
            Logger.panic("Could initialize YouTube API!");
        }
    }
    else {
        Logger.log("Google API disabled, won't load.\n");
    }

    if (ConfigUtils.getconfig().TwitterAPIEnabled) {
        Logger.log("Initializing Twitter API...");
        try {
            SocialCommands.initTwitterAPI(new Twitter({
                consumer_key: ConfigUtils.getconfig().TwitterClientKey,
                consumer_secret: ConfigUtils.getconfig().TwitterClientSecret,
                access_token_key: ConfigUtils.getconfig().TwitterAccessTokenKey,
                access_token_secret: ConfigUtils.getconfig().TwitterAccessTokenSecret
            }));
            Logger.ok();
        }
        catch (err) {
            Logger.failed();
            Logger.panic("Could initialize YouTube API!");
        }
    }
    else {
        Logger.log("Twitter API disabled, won't load.\n");
    }

    if (ConfigUtils.getconfig().GiphyAPIEnabled) {
        Logger.log("Initializing Giphy API...");
        try {
            SearchCommands.initGiphy(new Giphy(ConfigUtils.getconfig().GiphyAPIKey));
            Logger.ok();
        }
        catch (err) {
            Logger.failed();
            Logger.panic("Could initialize YouTube API!");
        }
    }
    else {
        Logger.log("Giphy  API disabled, won't load.\n");
    }

    Logger.log("Loading commands...");
    CommandManager.loadCommands();
    Logger.ok();

    if (!fs.existsSync("plugins/")) {
        Logger.log("Creating plugin directory...");
        try {
            fs.mkdirSync("plugins");
            Logger.ok();
        }
        catch (err) {
            Logger.failed();
            Logger.panic(`Could not create the plugins directory: ${err.message}`);
        }
    }

    Logger.log("Loading plugins:\n");
    PluginManager.loadPlugins(client);
    Logger.log(`Loaded ${Object.keys(PluginManager.getPlugins()).length} plugin`);
    if (Object.keys(PluginManager.getPlugins()).length > 1 || Object.keys(PluginManager.getPlugins()).length === 0) {
        console.log("s");
    }
    else {
        console.log("");
    }

    Logger.log("Generating GitHub help file...");
    try {
        CommandManager.genHelpTable();
        Logger.ok();
    }
    catch (err) {
        Logger.failed();
        Logger.panic("Could initialize Google Images API!");
    }

    client.on("ready", () => {
        client.user.setPresence("online");
        client.user.setActivity(ConfigUtils.getconfig().Playing);
        Logger.ok();
        Logger.log(`Ready, logged in as '${client.user.tag}'!\n`);
    });

    client.on("message", async (message) => {
        if (message.content.startsWith(ConfigUtils.getconfig().Prefix) && message.author.id !== client.user.id) {
            if (!TEST_MODE) {
                var color = Utils.get4bitColor(message.member.highestRole.hexColor);
                Logger.log(`\x1B[${color}m${message.author.tag}\x1B[0m issued: ${message.content}\n`);
            }
            var msg = message.content.substring(ConfigUtils.getconfig().Prefix.length);
            var args = msg.split(" ");
            var alias = CommandManager.getAliases()[args[0].toUpperCase()];
            var firstchar = args[0].toUpperCase().charCodeAt(1);
            if (firstchar < 65 || firstchar > 90) {
                return;
            }
            if (alias) {
                msg = alias + msg.substring(args[0].length);
                args[0] = alias;
            }
            var command = CommandManager.getCommands()[args[0].toUpperCase()];
            if (command) {
                if (command.adminonly) {
                    if (PermUtils.isAdmin(message.member)) {
                        await message.channel.startTyping();
                        command.handler(client, message, msg, args);
                        await message.channel.stopTyping();
                    }
                    else {
                        message.channel.send(":no_entry: `Sorry, but your KD is too low to issue this command`");
                    }
                }
                else {
                    await message.channel.startTyping();
                    command.handler(client, message, msg, args);
                    await message.channel.stopTyping();
                }
            }
            else {
                message.channel.send(`:no_entry: \`The command '${args[0]}' is as legit as an OpticGaming player on this server :(\``);
            }
        }
    });

    client.on("guildMemberAdd", (member) => {
        Logger.log(`${member.user.tag}\n`);
    });

    Logger.log("Starting discord client...");
    client.login(ConfigUtils.getconfig().DiscordToken).catch((err) => {
        Logger.failed();
        Logger.panic(`Could not start discord client!\n${err}`);
    });
}

// <================ EXPERIMENTAL AREA ================>

function debug(dclient, message, msg, args) {
    client.channels["427914012718792704"].delete();
}

// <================ EXPERIMENTAL AREA ================>