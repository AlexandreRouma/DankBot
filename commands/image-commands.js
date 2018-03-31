var qr = require('qr-image');
var fs = require("fs");
var Discord = require("discord.js");
var Jimp = require("jimp");

module.exports.qrcode = function (client, message, msg, args) {
    if (args.length > 1) {
        message.channel.send("", new Discord.Attachment(qr.image(msg.substring(7), { type: 'png' })));
    }
    else {
        message.channel.send(":no_entry: `Tell me what to turn into a qr code");
    }
}

module.exports.hsgtf = function (client, message, msg, args) {
    getLastImage(message, args, 6, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then(function (image) {
                Jimp.read("resources/images/hsgtf.png", function (err, background) {
                    if (err) throw err;
                    image.contain(600, 392, Jimp.RESIZE_BICUBIC, function (err, src) {
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
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
}

module.exports.wth = function (client, message, msg, args) {
    getLastImage(message, args, 6, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then(function (image) {
                Jimp.read("resources/images/wth.png", function (err, background) {
                    if (err) throw err;
                    image.contain(158, 177, Jimp.RESIZE_BICUBIC, function (err, src) {
                        background.composite(src, 42, 29)
                            .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
                            });
                    });
                });
            }).catch(function (err) {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
}

module.exports.usoab = function (client, message, msg, args) {
    getLastImage(message, args, 6, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then(function (image) {
                Jimp.read("resources/images/usoab.png", function (err, background) {
                    if (err) throw err;
                    image.contain(285, 416, Jimp.RESIZE_BICUBIC, function (err, src) {
                        background.composite(src, 26, 14)
                            .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
                            });
                    });
                });
            }).catch(function (err) {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
}

module.exports.suicide = function (client, message, msg, args) {
    message.channel.send(new Discord.Attachment("resources/images/nooseguy.png"));
}

module.exports.wtf = function (client, message, msg, args) {
    message.channel.send(new Discord.Attachment("resources/images/wtf.png"));
}

function getLastImage(message, args, substr, cb) {
    if (args.length > 1) {
        cb(msg.substring(substr));
    }
    else {
        message.channel.fetchMessages({ limit: 50 })
            .then((_messages) => {
                var messages = _messages.array();
                for (var i = 0; i < messages.length; i++) {
                    if (messages[i].attachments) {
                        if (messages[i].embeds) {
                            for (var j = 0; j < messages[i].embeds.length; j++) {
                                if (messages[i].embeds[j].url.indexOf('.png') !== -1 ||
                                    messages[i].embeds[j].url.indexOf('.jpg') !== -1 ||
                                    messages[i].embeds[j].url.indexOf('.bmp') !== -1) {
                                    cb(messages[i].embeds[j].url);
                                    return;
                                }
                            }
                        }
                        var attachments = messages[i].attachments.array();
                        for (var j = 0; j < attachments.length; j++) {
                            if (attachments[j].width) {
                                cb(attachments[j].url);
                                return;
                            }
                        }
                    }
                }
                cb(undefined);
            })
            .catch(console.error);
    }
}