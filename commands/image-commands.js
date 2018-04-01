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
    getLastImage(message, args, 4, (imglink) => {
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

module.exports.kek = function (client, message, msg, args) {
    getLastImage(message, args, 6, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then(function (image) {
                Jimp.read("resources/images/kek.png", function (err, background) {
                    if (err) throw err;
                    var base = new Jimp(background.bitmap.width, background.bitmap.height, function (err, base) {
                        image.contain(604, 303, Jimp.RESIZE_BICUBIC, function (err, src) {
                            base.composite(src, 0, 88)
                                .composite(background, 0, 0)
                                .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                                    message.channel.send(new Discord.Attachment(buffer));
                                });
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

module.exports.sepia = function (client, message, msg, args) {
    getLastImage(message, args, 6, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then(function (image) {
                image.sepia()
                    .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                        message.channel.send(new Discord.Attachment(buffer));
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

module.exports.greyscale = function (client, message, msg, args) {
    getLastImage(message, args, 10, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then(function (image) {
                image.greyscale()
                    .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                        message.channel.send(new Discord.Attachment(buffer));
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

module.exports.invert = function (client, message, msg, args) {
    getLastImage(message, args, 7, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then(function (image) {
                image.invert()
                    .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                        message.channel.send(new Discord.Attachment(buffer));
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

module.exports.dither = function (client, message, msg, args) {
    getLastImage(message, args, 7, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then(function (image) {
                image.dither565()
                    .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                        message.channel.send(new Discord.Attachment(buffer));
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

module.exports.normalize = function (client, message, msg, args) {
    getLastImage(message, args, 10, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then(function (image) {
                image.normalize()
                    .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                        message.channel.send(new Discord.Attachment(buffer));
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

module.exports.blur = function (client, message, msg, args) {
    if (args.length > 1) {
        try {
            var amount = parseInt(args[1], 10);
            getLastImage(message, args, 5, (imglink) => {
                if (imglink) {
                    Jimp.read(imglink).then(function (image) {
                        image.blur(amount)
                            .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
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
        catch (err) {
            message.channel.send(":no_entry: `Invalid blue amount`" + err.message);
        }
    }
    else {
        message.channel.send(":no_entry: `Tell me what blur amount you want`");
    }
}

module.exports.contrast = function (client, message, msg, args) {
    if (args.length > 1) {
        try {
            var contrast = parseFloat(args[1], 10);
            getLastImage(message, args, 9, (imglink) => {
                if (imglink) {
                    Jimp.read(imglink).then(function (image) {
                        image.contrast(contrast)
                            .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
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
        catch (err) {
            message.channel.send(":no_entry: `Invalid contrast amount`" + err.message);
        }
    }
    else {
        message.channel.send(":no_entry: `Tell me what contrast you want`");
    }
}

module.exports.brightness = function (client, message, msg, args) {
    if (args.length > 1) {
        try {
            var brightness = parseFloat(args[1], 10);
            getLastImage(message, args, 10, (imglink) => {
                if (imglink) {
                    Jimp.read(imglink).then(function (image) {
                        image.brightness(brightness)
                            .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
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
        catch (err) {
            message.channel.send(":no_entry: `Invalid brightness amount`" + err.message);
        }
    }
    else {
        message.channel.send(":no_entry: `Tell me what brightness you want`");
    }
}

module.exports.pixelate = function (client, message, msg, args) {
    if (args.length > 1) {
        try {
            var levels = parseFloat(args[1], 10);
            getLastImage(message, args, 9, (imglink) => {
                if (imglink) {
                    Jimp.read(imglink).then(function (image) {
                        image.pixelate(levels)
                            .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
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
        catch (err) {
            message.channel.send(":no_entry: `Invalid pixel amount`" + err.message);
        }
    }
    else {
        message.channel.send(":no_entry: `Tell by how many pixels to pixelate the image`");
    }
}

module.exports.jpeg = function (client, message, msg, args) {
    if (args.length > 1) {
        try {
            var quality = parseFloat(args[1], 10);
            getLastImage(message, args, 9, (imglink) => {
                if (imglink) {
                    Jimp.read(imglink).then(function (image) {
                        image.quality(quality)
                            .getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
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
        catch (err) {
            message.channel.send(":no_entry: `Invalid pixel amount`" + err.message);
        }
    }
    else {
        message.channel.send(":no_entry: `Tell by how many pixels to pixelate the image`");
    }
}

module.exports.deepfry = function (client, message, msg, args) {
    getLastImage(message, args, 7, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then(function (image) {
                image.pixelate(1.5)
                    .contrast(0.95)
                    .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                        message.channel.send(new Discord.Attachment(buffer));
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

module.exports.horizontalflip = function (client, message, msg, args) {
    getLastImage(message, args, 15, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then(function (image) {
                image.mirror(true, false)
                    .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                        message.channel.send(new Discord.Attachment(buffer));
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

module.exports.verticalflip = function (client, message, msg, args) {
    getLastImage(message, args, 13, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then(function (image) {
                image.mirror(false, true)
                    .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                        message.channel.send(new Discord.Attachment(buffer));
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

module.exports.posterize = function (client, message, msg, args) {
    if (args.length > 1) {
        try {
            var levels = parseInt(args[1], 10);
            getLastImage(message, args, 6, (imglink) => {
                if (imglink) {
                    Jimp.read(imglink).then(function (image) {
                        image.posterize(levels)
                            .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
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
        catch (err) {
            message.channel.send(":no_entry: `Invalid posterization levels`" + err.message);
        }
    }
    else {
        message.channel.send(":no_entry: `Tell me what posterization levels you want`");
    }
}

module.exports.hue = function (client, message, msg, args) {
    if (args.length > 1) {
        try {
            var degrees = parseFloat(args[1], 10);
            getLastImage(message, args, 6, (imglink) => {
                if (imglink) {
                    Jimp.read(imglink).then(function (image) {
                        image.color([
                            { apply: 'hue', params: [degrees] }
                        ])
                            .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
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
        catch (err) {
            message.channel.send(":no_entry: `Invalid hue degrees`" + err.message);
        }
    }
    else {
        message.channel.send(":no_entry: `Tell me how many degrees to spin the hue`");
    }
}

module.exports.suicide = function (client, message, msg, args) {
    message.channel.send(new Discord.Attachment("resources/images/nooseguy.png"));
}

module.exports.wtf = function (client, message, msg, args) {
    message.channel.send(new Discord.Attachment("resources/images/wtf.png"));
}

function getLastImage(message, args, substr, cb) {
    message.channel.fetchMessages({ limit: 50 })
        .then((_messages) => {
            var messages = _messages.array();
            for (var i = 0; i < messages.length; i++) {
                if (messages[i].attachments) {
                    if (messages[i].embeds) {
                        for (var j = 0; j < messages[i].embeds.length; j++) {
                            if (messages[i].embeds[j].url.indexOf('.png') !== -1 ||
                                messages[i].embeds[j].url.indexOf('.jpg') !== -1 ||
                                messages[i].embeds[j].url.indexOf('.gif') !== -1 ||
                                messages[i].embeds[j].url.indexOf('.bmp') !== -1) {
                                cb(messages[i].embeds[j].url);
                                return;
                            }
                            if (messages[i].embeds[j].image) {
                                cb(messages[i].embeds[j].image.url);
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
        .catch(console.error)
}