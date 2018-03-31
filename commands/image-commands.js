var qr = require('qr-image');
var fs = require("fs");
var Discord = require("discord.js");
var Jimp = require("jimp");

module.exports.qrcode = function (client, message, msg, args) {
    if (args.length > 1) {
        message.channel.send("", new Discord.Attachment(qr.image(msg.substring(7), { type: 'png' })));
    }
    else {
        message.channel.send(":no_entry: `Tell me what to turn into a qr code`");
    }
}

module.exports.hsgtf = function (client, message, msg, args) {
    var imglink;
    if (args.length > 1) {
        imglink = msg.substring(6);
    }
    else {
        imglink = "";
    }
    if (imglink) {
        Jimp.read(imglink).then(function (image) {
            Jimp.read("resources/images/hsgtf.png", function (err, background) {
                if (err) throw err;
                image.contain(600, 391, Jimp.RESIZE_BICUBIC, function (err, src) {
                    background.composite(src, 0, 96)
                        .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                            message.channel.send(new Discord.Attachment(buffer));
                        });
                });
            });
        }).catch(function (err) {
            message.channel.send(":no_entry: `No valid image provided`");
        });
    }
}

function getLastImage(message) {

}