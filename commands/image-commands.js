const qr = require("qr-image");
const fs = require("fs");
const Discord = require("discord.js");
const Jimp = require("jimp");
const GIFEncoder = require("gifencoder");

module.exports.qrcode = function (client, message, msg, args) {
    if (args.length > 1) {
        message.channel.send("", new Discord.Attachment(qr.image(msg.substring(7), { type: "png" })));
    }
    else {
        message.channel.send(":no_entry: `Tell me what to turn into a qr code");
    }
};

module.exports.hsgtf = function (client, message, msg, args) {
    getLastImage(message, args, 6, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                Jimp.read("resources/images/hsgtf.png", (err, background) => {
                    if (err) throw err;
                    image.contain(600, 392, Jimp.RESIZE_BICUBIC, (err2, src) => {
                        background.composite(src, 0, 96)
                            .getBuffer(Jimp.MIME_PNG, (err3, buffer) => {
                                if (err3) { return; }
                                message.channel.send(new Discord.Attachment(buffer));
                            });
                    });
                });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

module.exports.wth = function (client, message, msg, args) {
    getLastImage(message, args, 4, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                Jimp.read("resources/images/wth.png", (err, background) => {
                    if (err) throw err;
                    image.contain(158, 177, Jimp.RESIZE_BICUBIC, (err2, src) => {
                        background.composite(src, 42, 29)
                            .getBuffer(Jimp.MIME_PNG, (err3, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
                            });
                    });
                });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

module.exports.usoab = function (client, message, msg, args) {
    getLastImage(message, args, 6, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                Jimp.read("resources/images/usoab.png", (err, background) => {
                    if (err) throw err;
                    image.contain(285, 416, Jimp.RESIZE_BICUBIC, (err2, src) => {
                        background.composite(src, 26, 14)
                            .getBuffer(Jimp.MIME_PNG, (err3, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
                            });
                    });
                });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

module.exports.kek = function (client, message, msg, args) {
    getLastImage(message, args, 4, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                Jimp.read("resources/images/kek.png", (err, background) => {
                    if (err) throw err;
                    var flag = new Jimp(background.bitmap.width, background.bitmap.height, (err2, base) => {
                        image.contain(604, 303, Jimp.RESIZE_BICUBIC, (err3, src) => {
                            base.composite(src, 0, 88)
                                .composite(background, 0, 0)
                                .getBuffer(Jimp.MIME_PNG, (err4, buffer) => {
                                    message.channel.send(new Discord.Attachment(buffer));
                                });
                        });
                    });
                });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

module.exports.ibyg = function (client, message, msg, args) {
    getLastImage(message, args, 5, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                Jimp.read("resources/images/ibyg.png", (err, background) => {
                    if (err) throw err;
                    image.contain(514, 451, Jimp.RESIZE_BICUBIC, (err2, src) => {
                        background.composite(src, 62, 41)
                            .getBuffer(Jimp.MIME_PNG, (err3, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
                            });
                    });
                });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

module.exports.gay = function (client, message, msg, args) {
    getLastImage(message, args, 4, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                Jimp.read("resources/images/gay.png", (err, overlay) => {
                    if (err) throw err;
                    overlay.resize(image.bitmap.width, image.bitmap.height, Jimp.RESIZE_BICUBIC, (err2, src) => {
                        image.composite(overlay.opacity(0.5), 0, 0)
                            .getBuffer(Jimp.MIME_PNG, (err3, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
                            });
                    });
                });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

module.exports.sepia = function (client, message, msg, args) {
    getLastImage(message, args, 5, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                image.sepia()
                    .getBuffer(Jimp.MIME_PNG, (err2, buffer) => {
                        message.channel.send(new Discord.Attachment(buffer));
                    });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

module.exports.greyscale = function (client, message, msg, args) {
    getLastImage(message, args, 10, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                image.greyscale()
                    .getBuffer(Jimp.MIME_PNG, (err2, buffer) => {
                        message.channel.send(new Discord.Attachment(buffer));
                    });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

module.exports.invert = function (client, message, msg, args) {
    getLastImage(message, args, 7, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                image.invert()
                    .getBuffer(Jimp.MIME_PNG, (err2, buffer) => {
                        message.channel.send(new Discord.Attachment(buffer));
                    });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

module.exports.dither = function (client, message, msg, args) {
    getLastImage(message, args, 7, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                image.dither565()
                    .getBuffer(Jimp.MIME_PNG, (err2, buffer) => {
                        message.channel.send(new Discord.Attachment(buffer));
                    });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

module.exports.normalize = function (client, message, msg, args) {
    getLastImage(message, args, 10, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                image.normalize()
                    .getBuffer(Jimp.MIME_PNG, (err2, buffer) => {
                        message.channel.send(new Discord.Attachment(buffer));
                    });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

module.exports.blur = function (client, message, msg, args) {
    if (args.length > 1) {
        try {
            var amount = parseInt(args[1], 10);
            getLastImage(message, args, 5, (imglink) => {
                if (imglink) {
                    Jimp.read(imglink).then((image) => {
                        image.blur(amount)
                            .getBuffer(Jimp.MIME_PNG, (err2, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
                            });
                    }).catch(() => {
                        message.channel.send(":no_entry: `No valid image provided`");
                    });
                }
                else {
                    message.channel.send(":no_entry: `No image found`");
                }
            });
        }
        catch (err) {
            message.channel.send(":no_entry: `Invalid blur amount`");
        }
    }
    else {
        message.channel.send(":no_entry: `Tell me what blur amount you want`");
    }
};

module.exports.contrast = function (client, message, msg, args) {
    if (args.length > 1) {
        try {
            var contrast = parseFloat(args[1], 10);
            getLastImage(message, args, 9, (imglink) => {
                if (imglink) {
                    Jimp.read(imglink).then((image) => {
                        image.contrast(contrast)
                            .getBuffer(Jimp.MIME_PNG, (err2, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
                            });
                    }).catch(() => {
                        message.channel.send(":no_entry: `No valid image provided`");
                    });
                }
                else {
                    message.channel.send(":no_entry: `No image found`");
                }
            });
        }
        catch (err) {
            message.channel.send(":no_entry: `Invalid contrast amount`");
        }
    }
    else {
        message.channel.send(":no_entry: `Tell me what contrast you want`");
    }
};

module.exports.brightness = function (client, message, msg, args) {
    if (args.length > 1) {
        try {
            var brightness = parseFloat(args[1], 10);
            getLastImage(message, args, 10, (imglink) => {
                if (imglink) {
                    Jimp.read(imglink).then((image) => {
                        image.brightness(brightness)
                            .getBuffer(Jimp.MIME_PNG, (err2, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
                            });
                    }).catch(() => {
                        message.channel.send(":no_entry: `No valid image provided`");
                    });
                }
                else {
                    message.channel.send(":no_entry: `No image found`");
                }
            });
        }
        catch (err) {
            message.channel.send(":no_entry: `Invalid brightness amount`");
        }
    }
    else {
        message.channel.send(":no_entry: `Tell me what brightness you want`");
    }
};

module.exports.pixelate = function (client, message, msg, args) {
    if (args.length > 1) {
        try {
            var levels = parseFloat(args[1], 10);
            getLastImage(message, args, 9, (imglink) => {
                if (imglink) {
                    Jimp.read(imglink).then((image) => {
                        image.pixelate(levels)
                            .getBuffer(Jimp.MIME_PNG, (err2, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
                            });
                    }).catch(() => {
                        message.channel.send(":no_entry: `No valid image provided`");
                    });
                }
                else {
                    message.channel.send(":no_entry: `No image found`");
                }
            });
        }
        catch (err) {
            message.channel.send(":no_entry: `Invalid pixel amount`");
        }
    }
    else {
        message.channel.send(":no_entry: `Tell by how many pixels to pixelate the image`");
    }
};

module.exports.jpeg = function (client, message, msg, args) {
    if (args.length > 1) {
        try {
            var quality = parseFloat(args[1], 10);
            getLastImage(message, args, 5, (imglink) => {
                if (imglink) {
                    Jimp.read(imglink).then((image) => {
                        image.quality(quality)
                            .getBuffer(Jimp.MIME_JPEG, (err2, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
                            });
                    }).catch(() => {
                        message.channel.send(":no_entry: `No valid image provided`");
                    });
                }
                else {
                    message.channel.send(":no_entry: `No image found`");
                }
            });
        }
        catch (err) {
            message.channel.send(":no_entry: `Invalid pixel amount`");
        }
    }
    else {
        message.channel.send(":no_entry: `Tell by how many pixels to pixelate the image`");
    }
};

module.exports.deepfry = function (client, message, msg, args) {
    getLastImage(message, args, 7, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                image.pixelate(1.5)
                    .contrast(0.95)
                    .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                        if (err) { return; }
                        message.channel.send(new Discord.Attachment(buffer));
                    });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

module.exports.horizontalflip = function (client, message, msg, args) {
    getLastImage(message, args, 15, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                image.mirror(true, false)
                    .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                        if (err) { return; }
                        message.channel.send(new Discord.Attachment(buffer));
                    });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

module.exports.verticalflip = function (client, message, msg, args) {
    getLastImage(message, args, 13, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                image.mirror(false, true)
                    .getBuffer(Jimp.MIME_PNG, (err2, buffer) => {
                        message.channel.send(new Discord.Attachment(buffer));
                    });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

module.exports.posterize = function (client, message, msg, args) {
    if (args.length > 1) {
        try {
            var levels = parseInt(args[1], 10);
            getLastImage(message, args, 10, (imglink) => {
                if (imglink) {
                    Jimp.read(imglink).then((image) => {
                        image.posterize(levels)
                            .getBuffer(Jimp.MIME_PNG, (err2, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
                            });
                    }).catch(() => {
                        message.channel.send(":no_entry: `No valid image provided`");
                    });
                }
                else {
                    message.channel.send(":no_entry: `No image found`");
                }
            });
        }
        catch (err) {
            message.channel.send(":no_entry: `Invalid posterization levels`");
        }
    }
    else {
        message.channel.send(":no_entry: `Tell me what posterization levels you want`");
    }
};

module.exports.hue = function (client, message, msg, args) {
    if (args.length > 1) {
        try {
            var degrees = parseFloat(args[1], 10);
            getLastImage(message, args, 4, (imglink) => {
                if (imglink) {
                    Jimp.read(imglink).then((image) => {
                        image.color([
                            { apply: "hue", params: [degrees] }
                        ])
                            .getBuffer(Jimp.MIME_PNG, (err2, buffer) => {
                                message.channel.send(new Discord.Attachment(buffer));
                            });
                    }).catch(() => {
                        message.channel.send(":no_entry: `No valid image provided`");
                    });
                }
                else {
                    message.channel.send(":no_entry: `No image found`");
                }
            });
        }
        catch (err) {
            message.channel.send(":no_entry: `Invalid hue degrees`");
        }
    }
    else {
        message.channel.send(":no_entry: `Tell me how many degrees to spin the hue`");
    }
};

module.exports.suicide = function (client, message, msg, args) {
    message.channel.send(new Discord.Attachment("resources/images/nooseguy.png"));
};

module.exports.wtf = function (client, message, msg, args) {
    message.channel.send(new Discord.Attachment("resources/images/wtf.png"));
};

module.exports.nou = function (client, message, msg, args) {
    message.channel.send(new Discord.Attachment("resources/images/nou.png"));
};

module.exports.triggered = function (client, message, msg, args) {
    getLastImage(message, args, 10, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                Jimp.read("resources/images/triggered.png", (err, triggered) => {
                    if (err) throw err;
                    var base = new Jimp(image.bitmap.width, image.bitmap.height, (err2, canvas) => {
                        triggered.resize(image.bitmap.width, image.bitmap.height / 5, Jimp.RESIZE_BICUBIC, (err3, src) => {
                            var nw = image.bitmap.width - (image.bitmap.width / 20);
                            var nh = image.bitmap.height - (image.bitmap.height / 20);
                            canvas.composite(image, 0, 0)
                                .composite(triggered, 0, image.bitmap.height - (image.bitmap.height / 5), (err4, baseframe) => {
                                    var encoder = new GIFEncoder(nw, nh);
                                    message.channel.send(new Discord.Attachment(encoder.createReadStream(), "triggered.gif"));
                                    encoder.start();
                                    encoder.setRepeat(0);
                                    encoder.setDelay(34);
                                    encoder.setQuality(10);
                                    encoder.addFrame(baseframe.clone().crop(0, 0, nw, nh).bitmap.data);
                                    encoder.addFrame(baseframe.clone().crop(image.bitmap.width / 20, image.bitmap.height / 20, nw, nh).bitmap.data);
                                    encoder.addFrame(baseframe.clone().crop(0, image.bitmap.height / 20, nw, nh).bitmap.data);
                                    encoder.addFrame(baseframe.clone().crop(image.bitmap.width / 20, 0, nw, nh).bitmap.data);
                                    encoder.finish();
                                });
                        });
                    });
                });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

module.exports.shake = function (client, message, msg, args) {
    getLastImage(message, args, 6, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                var base = new Jimp(image.bitmap.width, image.bitmap.height, (err2, canvas) => {
                    var nw = image.bitmap.width - (image.bitmap.width / 20);
                    var nh = image.bitmap.height - (image.bitmap.height / 20);
                    var encoder = new GIFEncoder(nw, nh);
                    message.channel.send(new Discord.Attachment(encoder.createReadStream(), "shake.gif"));
                    encoder.start();
                    encoder.setRepeat(0);
                    encoder.setDelay(34);
                    encoder.setQuality(10);
                    encoder.addFrame(image.clone().crop(0, 0, nw, nh).bitmap.data);
                    encoder.addFrame(image.clone().crop(image.bitmap.width / 20, image.bitmap.height / 20, nw, nh).bitmap.data);
                    encoder.addFrame(image.clone().crop(0, image.bitmap.height / 20, nw, nh).bitmap.data);
                    encoder.addFrame(image.clone().crop(image.bitmap.width / 20, 0, nw, nh).bitmap.data);
                    encoder.finish();
                });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

module.exports.spin = function (client, message, msg, args) {
    getLastImage(message, args, 6, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                var base = new Jimp(image.bitmap.width, image.bitmap.height, (err2, canvas) => {
                    var nw = image.bitmap.width - (image.bitmap.width / 20);
                    var nh = image.bitmap.height - (image.bitmap.height / 20);
                    var encoder = new GIFEncoder(nw, nh);
                    message.channel.send(new Discord.Attachment(encoder.createReadStream(), "spin.gif"));
                    encoder.start();
                    encoder.setRepeat(0);
                    encoder.setDelay(100);
                    encoder.setQuality(10);
                    encoder.addFrame(image.clone().rotate(0).bitmap.data);
                    encoder.addFrame(image.clone().rotate(36).bitmap.data);
                    encoder.addFrame(image.clone().rotate(72).bitmap.data);
                    encoder.addFrame(image.clone().rotate(108).bitmap.data);
                    encoder.addFrame(image.clone().rotate(144).bitmap.data);
                    encoder.addFrame(image.clone().rotate(180).bitmap.data);
                    encoder.addFrame(image.clone().rotate(216).bitmap.data);
                    encoder.addFrame(image.clone().rotate(252).bitmap.data);
                    encoder.addFrame(image.clone().rotate(288).bitmap.data);
                    encoder.addFrame(image.clone().rotate(324).bitmap.data);
                    encoder.finish();
                });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};

function getLastImage(message, args, substr, cb) {
    message.channel.fetchMessages({ limit: 50 })
        .then((_messages) => {
            var messages = _messages.array();
            for (var i = 0; i < messages.length; i++) {
                if (messages[i].attachments) {
                    if (messages[i].embeds) {
                        for (var j = 0; j < messages[i].embeds.length; j++) {
                            if (messages[i].embeds[j].url.indexOf(".png") !== -1 ||
                                messages[i].embeds[j].url.indexOf(".jpg") !== -1 ||
                                messages[i].embeds[j].url.indexOf(".gif") !== -1 ||
                                messages[i].embeds[j].url.indexOf(".bmp") !== -1) {
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
        .catch(console.error);
}

module.exports.enhance = function (client, message, msg, args) {
    getLastImage(message, args, 13, (imglink) => {
        if (imglink) {
            Jimp.read(imglink).then((image) => {
                image.resize(image.bitmap.width * 1.5, image.bitmap.height * 1.5)
                    .getBuffer(Jimp.MIME_PNG, (err2, buffer) => {
                        message.channel.send(new Discord.Attachment(buffer));
                    });
            }).catch(() => {
                message.channel.send(":no_entry: `No valid image provided`");
            });
        }
        else {
            message.channel.send(":no_entry: `No image found`");
        }
    });
};