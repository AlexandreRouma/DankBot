var qr = require('qr-image');
var fs = require("fs");
var Discord = require("discord.js");

module.exports.qrcode = function (client, message, msg, args) {
    if (args.length > 1) {
        message.channel.send("", new Discord.Attachment(qr.image(msg.substring(7), { type: 'png' })));
    }
    else {
        message.channel.send(":no_entry: `Tell me what to turn into a qr code");
    }
}