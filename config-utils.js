const fs = require("fs");

var config = null;
var version = null;
var tags = null;

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
    tags = {};
};

module.exports.loadconfig = function () {
    config = JSON.parse(fs.readFileSync("resources/config/config.json"));
    tags = JSON.parse(fs.readFileSync("resources/config/tags.json"));
    version = JSON.parse(fs.readFileSync("version.json"));
};

module.exports.saveconfig = function () {
    fs.writeFileSync("resources/config/config.json", JSON.stringify(config, null, 4));
    fs.writeFileSync("resources/config/tags.json", JSON.stringify(tags, null, 4));
};

module.exports.getconfig = function () {
    return config;
};

module.exports.setconfig = function (conf) {
    config = conf;
};

module.exports.gettags = function () {
    return tags;
};

module.exports.getversion = function () {
    return version;
};