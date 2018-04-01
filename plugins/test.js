var Discord = require("discord.js");
var CommandManager = require("../command-manager");
var client;

module.exports._plugin_info = {
    name: "helloworld",
    author: "xX_WhatsTheGeek_Xx",
    plugin_url: "https://github.com/AlexandreRouma/DankBot"
}

module.exports._load = function (_client) {
    client = _client;
    CommandManager.registerCommand("HELLOWORLD", "HW", "helloworld", "Say 'Hellow World' !", false, helloworld);
}

function helloworld(client, message, msg, args) {
    message.channel.send("Hello World");
}