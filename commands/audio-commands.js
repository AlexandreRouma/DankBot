const ytdl = require("ytdl-core");
const mexp = require("math-expression-evaluator");
const PermUtils = require("../perm-utils");
const ytsearch = require("youtube-search");
const ConfigUtils = require("../config-utils");
const fs = require("fs");

var playlist = [];
var dispatcher;
var channel = null;
var conn;
var looped = false;
var stopped = false;
var paused = false;
var playingsoundeffect = false;
var opts;
var stopvotes = [];
var skipvotes = [];

module.exports.initYoutubeAPIKey = function (key) {
    opts = {
        type: "video",
        maxResults: 10,
        key: key
    };
};

module.exports.play = function (client, message, msg, args) {
    if (args.count === 1 || args[1] === "") {
        message.channel.send(":no_entry: `Tell me what you want me to play...`");
        return;
    }
    if (playingsoundeffect) {
        message.channel.send(":no_entry: `Sorry, I'm already playing sound effects...`:mega:");
        return;
    }
    if (message.member.voiceChannel) {
        if (channel !== null) {
            if (channel.name !== message.member.voiceChannel.name) {
                message.channel.send(":no_entry: `Sorry, you are't in the same audio channel as the bot !`");
                return;
            }
        }
        channel = message.member.voiceChannel;
        ytsearch(msg.substring(5), opts, (yterr, results) => {
            if (yterr) {
                message.channel.send(":no_entry: `That video doesn't exist nigga`:joy:");
                return;
            }
            var result = results[0];
            results.every((element, i) => {
                if (element.kind === "") {
                    result = element;
                    return false;
                }
            });
            var exists = false;
            playlist.every((element, i) => {
                if (result.link === element.url) {
                    exists = true;
                    return false;
                }
            });
            if (!exists) {
                playlist.push({
                    url: result.link,
                    title: result.title
                });
                message.member.voiceChannel.join()
                    .then((connection) => {
                        conn = connection;
                        message.channel.send(`:white_check_mark: \`'${result.title}' has been added to the playlist !\``);
                        if (playlist.length === 1) {
                            dispatcher = conn.playStream(ytdl(playlist[0].url, { quality: "highestaudio" }));
                            dispatcher.on("end", () => {
                                if (looped) {
                                    var first = playlist[0];
                                    playlist.shift();
                                    playlist.push(first);
                                }
                                else {
                                    playlist.shift();
                                }
                                next();
                            });
                        }
                    });
            }
            else {
                message.channel.send(":no_entry: `Sorry, this video is already in the playlist !`");
            }
        });
    }
    else {
        message.channel.send(":no_entry: `Sorry, u aren't in a fucking audio channel m8`");
    }
};

module.exports.pause = function (client, message, msg, args) {
    if (!paused) {
        if (channel.name !== message.member.voiceChannel.name) {
            message.channel.send(":no_entry: `Sorry, you are't in the same audio channel as the bot !`");
            return;
        }
        dispatcher.pause();
        paused = true;
        message.channel.send(`:white_check_mark: \`Paused.\``);
    }
    else {
        message.channel.send(":no_entry: `Already paused`");
    }
};

module.exports.resume = function (client, message, msg, args) {
    if (paused) {
        if (channel.name !== message.member.voiceChannel.name) {
            message.channel.send(":no_entry: `Sorry, you are't in the same audio channel as the bot !`");
            return;
        }
        dispatcher.resume();
        paused = false;
        message.channel.send(":white_check_mark: `Resumed.`");
    }
    else {
        message.channel.send(":no_entry: `Already resumed`");
    }
};

module.exports.stop = function (client, message, msg, args) {
    stopped = true;
    if (playlist.length > 0) {
        if (message.member.voiceChannel) {
            if (channel.name !== message.member.voiceChannel.name) {
                message.channel.send(":no_entry: `Sorry, you are't in the same audio channel as the bot !`");
                return;
            }
            if (PermUtils.isAdmin(message.member)) {
                playlist = [];
                dispatcher.end();
                return;
            }
            if (!stopvotes.includes(message.author.id.toString()) && stopvotes.length > Math.ceil((channel.members.array().length - 1) / 2)) {
                stopvotes.push(message.author.id.toString());
                message.channel.send(`:white_check_mark: \`${stopvotes.length < Math.ceil((channel.members.array().length - 1) / 2) - stopvotes.length} more votes needed.\``);
            }
            else if (!stopvotes.includes(message.author.id.toString())) { // || PermUtils.isAdmin(message.author)
                playlist = [];
                dispatcher.end();
            }
            else {
                message.channel.send(":no_entry: `Sorry, you already voted !`");
            }
        }
        else {
            message.channel.send(":no_entry: `Sorry, u aren't in a fucking audio channel m8`");
        }
    }
    else {
        message.channel.send(":no_entry: `Not playing anything...`");
    }
};

module.exports.skip = function (client, message, msg, args) {
    if (playlist.length > 0) {
        if (message.member.voiceChannel) {
            if (channel.name !== message.member.voiceChannel.name) {
                message.channel.send(":no_entry: `Sorry, you are't in the same audio channel as the bot !`");
                return;
            }
            if (PermUtils.isAdmin(message.member)) {
                dispatcher.end();
                return;
            }
            if (!skipvotes.includes(message.author.id.toString()) && skipvotes.length < Math.ceil((channel.members.array().length - 1) / 2)) {
                skipvotes.push(message.author.id.toString());
                message.channel.send(`:white_check_mark: \`${Math.ceil((channel.members.array().length - 1) / 2) - skipvotes.length} more votes needed.\``);
            }
            else if (!skipvotes.includes(message.author.id.toString())) {
                dispatcher.end();
            }
            else {
                message.channel.send(":no_entry: `Sorry, you already voted !`");
            }
        }
        else {
            message.channel.send(":no_entry: `Sorry, u aren't in a fucking audio channel m8`");
        }
    }
    else {
        message.channel.send(":no_entry: `Not playing anything...`");
    }
};

module.exports.loop = function (client, message, msg, args) {
    if (playlist.length > 0) {
        if (channel.name !== message.member.voiceChannel.name) {
            message.channel.send(":no_entry: `Sorry, you are't in the same audio channel as the bot !`");
            return;
        }
        looped = !looped;
        if (looped) {
            message.channel.send(":white_check_mark: `Loop mode enabled`");
        }
        else {
            message.channel.send(":white_check_mark: `Loop mode disabled`");
        }
    }
    else {
        message.channel.send(":no_entry: `Not playing anything...`");
    }
};

module.exports.playlist = function (client, message, msg, args) {
    if (playlist.length > 0) {
        var str = "";
        var i = 0;
        playlist.forEach((val) => {
            i++;
            str += `${i}) ${val.title}\n`;
        });
        message.channel.send(`\`\`\`${str}\`\`\``);
    }
    else {
        message.channel.send(":no_entry: `Not playing anything...`");
    }
};

module.exports.soundeffect = function (client, message, msg, args) {
    if (args.count === 1 || args[1] === "") {
        message.channel.send("https://github.com/AlexandreRouma/DankBot/wiki/Sound-Effect-List");
        return;
    }
    if (message.member.voiceChannel) {
        if (channel !== null) {
            message.channel.send(":no_entry: `Sorry, I'm already playing music...` :musical_note:");
            return;
        }
        if (args[1] === "playlist_done") {
            message.channel.send(":no_entry: `You tried xD` :ok_hand:");
            return;
        }
        if (fs.existsSync(`resources/sounds/se_${args[1].toLowerCase()}.wav`)) {
            channel = message.member.voiceChannel;
            message.member.voiceChannel.join()
                .then((connection) => {
                    conn = connection;
                    playingsoundeffect = true;
                    dispatcher = conn.playFile(`resources/sounds/se_${args[1].toLowerCase()}.wav`);
                    dispatcher.on("end", () => {
                        channel.leave();
                        channel = null;
                        playingsoundeffect = false;
                    });
                })
                .catch(console.log);
        }
        else {
            message.channel.send(":no_entry: `Unknown sound effect`");
        }
    }
    else {
        message.channel.send(":no_entry: `Sorry, u aren't in a fucking audio channel m8`");
    }
};

module.exports.remove = function (client, message, msg, args) {
    if (args.count === 1 || args[1] === "") {
        message.channel.send(":no_entry: `Please enter the id of the song!`");
        return;
    }
    if (message.member.voiceChannel) {
        var id = mexp.eval(msg.substring(7)) - 1;
        if (id === 0) {
            message.channel.send(":no_entry: `Can't remove the currently playing song...`");
            return;
        }
        if (playlist[id]) {
            var item = playlist[id];
            playlist.splice(id, 1);
            message.channel.send(`:white_check_mark: \`Removed '${item.title}'\``);
        }
        else {
            message.channel.send(":no_entry: `Invalid song id...`");
        }
    }
    else {
        message.channel.send(":no_entry: `Sorry, u aren't in a fucking audio channel m8`");
    }
};

function next() {
    stopvotes = [];
    skipvotes = [];
    if (playlist.length > 0) {
        if (playlist[0].url) {
            dispatcher = conn.playStream(ytdl(playlist[0].url, { quality: "highestaudio" }));
            dispatcher.on("end", () => {
                if (looped) {
                    var first = playlist[0];
                    playlist.shift();
                    playlist.push(first);
                }
                else {
                    playlist.shift();
                }
                next();
            });
        }
    }
    else if (!stopped) {
        playingsoundeffect = true;
        dispatcher = conn.playFile(`resources/sounds/playlist_done.wav`);
        dispatcher.on("end", () => {
            channel.leave();
            channel = null;
            playingsoundeffect = false;
        });
    }
    else {
        channel.leave();
        channel = null;
        stopped = false;
    }
}