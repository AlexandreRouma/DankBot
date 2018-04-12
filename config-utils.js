const fs = require("fs");

var config = null;
var version = null;

module.exports.loaddefault = function () {
    config = {
        DiscordToken: "INSERT_HERE",
        BotAdminRoles: ["role1", "role2"],
        Playing: "DankBot",
        Prefix: ";",
        GoogleSearchEngineID: "INSERT_HERE",
        GoogleAPIKey: "INSERT_HERE",
        TwitterClientKey: "INSERT_HERE",
        TwitterClientSecret: "INSERT_HERE",
        TwitterAccessTokenKey: "INSERT_HERE",
        TwitterAccessTokenSecret: "INSERT_HERE",
        GiphyAPIKey: "INSERT_HERE",
        GoogleAPIEnabled: true,
        TwitterAPIEnabled: true,
        GiphyAPIEnabed: true,
        MuteRole: "INSERT_HERE"
    };
};

module.exports.loadconfig = function () {
    config = JSON.parse(fs.readFileSync("resources/config/config.json"));
    version = JSON.parse(fs.readFileSync("version.json"));
};

module.exports.saveconfig = function () {
    if (!fs.existsSync("resources/config")) fs.mkdirSync("resources/config");
    fs.writeFileSync("resources/config/config.json", JSON.stringify(config, null, 4));
};

module.exports.getconfig = function () {
    return config;
};

module.exports.setconfig = function (conf) {
    config = conf;
};

module.exports.getversion = function () {
    return version;
};