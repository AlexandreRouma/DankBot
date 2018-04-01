var Discord = require('discord.js');
var Art = require('./art');
var Logger = require('./logger');
var ConfigUtils = require("./config-utils");
var PermUtils = require("./perm-utils")
var CommandManager = require('./command-manager');
var fs = require("fs");
var client = new Discord.Client();
var ytsearch = require('youtube-search');
var GoogleImages = require('google-images');
var GoogleSearch = require('google-search');
var Youtube = require("youtube-api");
var Giphy = require('giphy')
var SearchCommands = require("./commands/search-commands");
var MiscCommands = require("./commands/misc-commands");
var AudioCommands = require("./commands/audio-commands");
var SocialCommands = require("./commands/social-commands");
var PluginManager = require("./plugin-manager");
var path = require("path");
var Twitter = require('twitter');

main();
function main() {
    Art.displaySplash();

    if (!fs.existsSync("resources/config/config.json")) {
        Logger.log("Creating configuration file...");
        try {
            ConfigUtils.loaddefault();
            ConfigUtils.saveconfig();
            Logger.ok();
        }
        catch (err) {
            Logger.failed();
            Logger.panic("Could not create the configuration file: " + err.message);
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
                type: "key"
                , key: ConfigUtils.getconfig().GoogleAPIKey
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

    Logger.log("Loading plugins:\n");
    PluginManager.loadPlugins();
    Logger.log(`Loaded ${Object.keys(PluginManager.getPlugins()).length} plugin`);
    if (Object.keys(PluginManager.getPlugins()).length > 1 || Object.keys(PluginManager.getPlugins()).length == 0) {
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

    Logger.log("Starting discord client...");
    client.login(ConfigUtils.getconfig().DiscordToken).catch(() => {
        Logger.failed();
        Logger.panic("Could not start discord client!")
    });

    client.on("ready", () => {
        client.user.setPresence("online");
        client.user.setActivity(ConfigUtils.getconfig().Playing);
        Logger.ok();
        Logger.log(`Ready, logged in as '${client.user.tag}'!\n`);
    });

    client.on('message', async message => {
        if (message.content.startsWith(ConfigUtils.getconfig().Prefix) && message.author.id != client.user.id) {
            var msg = message.content.substring(ConfigUtils.getconfig().Prefix.length);
            var args = msg.split(" ");
            if (CommandManager.getAliases()[args[0].toUpperCase()]) {
                var replacement = CommandManager.getAliases()[args[0].toUpperCase()];
                msg = CommandManager.getAliases()[args[0].toUpperCase()] + msg.substring(args[0].length);
                args[0] = replacement;
            }
            var command = CommandManager.getCommands()[args[0].toUpperCase()];
            if (command) {
                if (CommandManager.getAdminOnly(args[0].toUpperCase())) {
                    if (PermUtils.isAdmin(message.member)) {
                        await message.channel.startTyping();
                        command(client, message, msg, args);
                        await message.channel.stopTyping();
                    }
                    else {
                        message.channel.send(":no_entry: `Sorry, but your KD is too low to issue this command`");
                    }
                }
                else {
                    await message.channel.startTyping();
                    command(client, message, msg, args);
                    await message.channel.stopTyping();
                }
            }
            else {
                message.channel.send(`:no_entry: \`The command '${args[0]}' is as legit as an OpticGaming player on this server :(\``);
            }
        }
    });
}

// <================ EXPERIMENTAL AREA ================>

function debug(client, message, msg, args) {
    if (PermUtils.isAdmin(message.member)) {
        message.channel.send(":white_check_mark:");
    }
    else {
        message.channel.send(":no_entry:");
    }
}

// <================ EXPERIMENTAL AREA ================>