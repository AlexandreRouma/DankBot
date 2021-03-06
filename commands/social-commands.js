const Youtube = require("youtube-api");
const Utils = require("../utils");
const Discord = require("discord.js");
const ytsearch = require("youtube-search");
const Twitter = require("twitter");

var opts;
var tclient;

module.exports.initYoutubeAPIKey = function (key) {
    opts = {
        maxResults: 10,
        key: key
    };
};

module.exports.initTwitterAPI = function (tw) {
    tclient = tw;
};

module.exports.comment = function (client, message, msg, args) {
    try {
        if (args.length > 1) {
            ytsearch(msg.substring(8), opts, (yterr, results) => {
                if (yterr) {
                    message.channel.send(":no_entry: `That video doesn't exist nigga`:joy:");
                    return;
                }
                var result = null;
                results.forEach((element, i) => {
                    if (element.kind === "youtube#video") {
                        result = element;
                        return false;
                    }
                });
                Youtube.commentThreads.list({ "part": "snippet,replies", "videoId": result.id }, (err, response) => {
                    if (err) {
                        message.channel.send(":no_entry: `The YouTube API server is unavailable`");
                        return;
                    }
                    var comment = response.items[Utils.getRandomInt(response.items.length - 1)].snippet.topLevelComment.snippet;
                    var embed = new Discord.RichEmbed();
                    embed.setColor("BLUE");
                    embed.setAuthor(comment.authorDisplayName, comment.authorProfileImageUrl, comment.authorChannelUrl);
                    if (comment.likeCount > 1) {
                        embed.setFooter(`${comment.likeCount} likes`);
                    }
                    else if (comment.likeCount === 1) {
                        embed.setFooter("1 like");
                    }
                    else {
                        embed.setFooter(`No likes`);
                    }
                    embed.setDescription(comment.textDisplay);
                    message.channel.send(embed);
                });
            });
        }
        else {
            message.channel.send(":no_entry: `Tell which video to take the comments from...`");
        }
    }
    catch (err) {
        message.channel.send(":no_entry: `Google service not available :/`");
    }
};

module.exports.lasttweet = function (client, message, msg, args) {
    try {
        if (args.length > 1) {
            var params = { screen_name: msg.substring(10) };
            tclient.get("statuses/user_timeline", params, (error, tweets, response) => {
                if (error) {
                    message.channel.send(":no_entry: `Could not get tweets from twitter user`");
                    return;
                }
                var tweet = tweets[0];
                var embed = new Discord.RichEmbed();
                embed.setColor("BLUE");
                embed.setAuthor(`${tweet.user.name} (@${tweet.user.screen_name})`, tweet.user.profile_image_url_https, `https://twitter.com/${tweet.user.screen_name}`);
                embed.setDescription(tweet.text);
                var footer = "";
                if (tweet.favorite_count > 1) {
                    footer += `${tweet.favorite_count} likes, `;
                }
                else if (tweet.favorite_count === 1) {
                    footer += `1 like, `;
                }
                else {
                    footer += `No likes, `;
                }
                if (tweet.retweet_count > 1) {
                    footer += `${tweet.retweet_count} retweets`;
                }
                else if (tweet.retweet_count === 1) {
                    footer += `1 retweet`;
                }
                else {
                    footer += `no retweets`;
                }
                embed.setFooter(footer);
                message.channel.send(embed);
            });
        }
        else {
            message.channel.send(":no_entry: `No username supplied :/`");
        }
    }
    catch (err) {
        message.channel.send(":no_entry: `Twitter service not available :/`");
    }
};

module.exports.randomtweet = function (client, message, msg, args) {
    try {
        if (args.length > 1) {
            var params = { screen_name: msg.substring(12) };
            tclient.get("statuses/user_timeline", params, (error, tweets, response) => {
                if (error) {
                    message.channel.send(":no_entry: `Could not get tweets from twitter user`");
                    return;
                }
                var tweet = tweets[Utils.getRandomInt(tweets.length - 1)];
                var embed = new Discord.RichEmbed();
                embed.setColor("BLUE");
                embed.setAuthor(`${tweet.user.name} (@${tweet.user.screen_name})`, tweet.user.profile_image_url_https, `https://twitter.com/${tweet.user.screen_name}`);
                embed.setDescription(tweet.text);
                var footer = "";
                if (tweet.favorite_count > 1) {
                    footer += `${tweet.favorite_count} likes, `;
                }
                else if (tweet.favorite_count === 1) {
                    footer += `1 like, `;
                }
                else {
                    footer += `No likes, `;
                }
                if (tweet.retweet_count > 1) {
                    footer += `${tweet.retweet_count} retweets`;
                }
                else if (tweet.retweet_count === 1) {
                    footer += `1 retweet`;
                }
                else {
                    footer += `no retweets`;
                }
                embed.setFooter(footer);
                message.channel.send(embed);
            });
        }
        else {
            message.channel.send(":no_entry: `No username supplied :/`");
        }
    }
    catch (err) {
        message.channel.send(":no_entry: `Twitter service not available :/`");
    }
};