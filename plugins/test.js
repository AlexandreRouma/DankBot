var Discord = require("discord.js");
var CommandManager = require("../command-manager");
var client;

module.exports._load = function (_client) {
    client = _client;
    CommandManager.registerCommand("HELLOWORLD", "HW", "helloworld", "Say 'Hello World' !", false, helloworld);
}

function helloworld(client, message, msg, args) {
    message.channel.send("Hello World");
}