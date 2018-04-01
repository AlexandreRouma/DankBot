var Discord = require("discord.js");
var CommandManager = require("../command-manager");
var client;

module.exports._plugin_info = { // All of these need to be present, but doesn't need to be filled in (except if "REQUIRED")
    name: "hello-world",                                      // Plugin name (REQUIRED)
    author: "xX_WhatsTheGeek_Xx",                            // Plugin author 
    url: "https://github.com/AlexandreRouma/DankBot",        // Plugin URL (github/wiki/info page/etc...)
    version: "1.0",                                          // Plugin version
    description: "Hello World plugin !",                            // Plugin description
    additional_info: {                                       // Additional info about the plugin (doesn't have to contain anything)
        what_you_want_here: "hey !"
    }
}

module.exports._load = function (_client) {
    client = _client;
    //                                 Name     Alias     Usage          Description
    CommandManager.registerCommand("HELLOWORLD", "HW", "helloworld", "Say 'Hello World' !", false, helloworld);
}

function helloworld(client, message, msg, args) {
    message.channel.send("Hello World"); // Send back "Hello World"
}