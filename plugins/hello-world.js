var Discord = require("discord.js");
var PluginManager = require("../plugin-manager");
var client;

var _plugin_info = { // All of these need to be present, but doesn't need to be filled in (except if "REQUIRED")
    name: "hello-world",                                     // Plugin name (REQUIRED)
    author: "xX_WhatsTheGeek_Xx",                            // Plugin author 
    url: "https://github.com/AlexandreRouma/DankBot",        // Plugin URL (github/wiki/info page/etc...)
    version: "1.0",                                          // Plugin version
    description: "Hello World plugin !",                     // Plugin description
    additional_info: {                                       // Additional info about the plugin (doesn't have to contain anything)
        what_you_want_here: "hey !"
    }
}

module.exports._plugin_info = _plugin_info;

module.exports._load = function (_client) {
    client = _client;
    //                                 Name     Alias     Usage          Description     AdminOnly  Function  Plugin Info
    PluginManager.registerCommand("HELLOWORLD", "HW", "helloworld", "Say 'Hello World' !", false, helloworld, _plugin_info);
}

function helloworld(client, message, msg, args) {
    message.channel.send("Hello World"); // Send back "Hello World"
}