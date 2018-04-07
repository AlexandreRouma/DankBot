var Discord = require("discord.js");
var CommandManager = require("../command-manager");
var Utils = require("../utils");
var client;

var players = {};
var ingame = false;
var GAMECARDS = {
    WEREWOLF: 0,
    WITCH: 1,
    BALLGAZER: 2,
    CRAZY: 3,
    VILLAGER: 4,
    CUPINDON: 5,
    WHITEWEREWOLF: 6,
    HUNTER: 7,
    FLUTEPLAYER: 8,
    THIEF: 9,
    KID: 10
}

var GAMECARDSNAMES = {
    "0": "WEREWOLF",
    "1": "WITCH",
    "2": "BALLGAZER",
    "3": "CRAZY",
    "4": "VILLAGER",
    "5": "CUPINDON",
    "6": "WHITEWEREWOLF",
    "7": "HUNTER",
    "8": "FLUTEPLAYER",
    "9": "THIEF",
    "10": "KID"
}

var gamechannel;

var _plugin_info = {
    name: "loup-garou",                                      // Plugin name (REQUIRED)
    author: "xX_WhatsTheGeek_Xx",                            // Plugin author 
    url: "https://github.com/AlexandreRouma/DankBot",        // Plugin URL (github/wiki/info page/etc...)
    version: "1.0",                                          // Plugin version
    description: "Plugin du jeux Loup Garou",                            // Plugin description
    additional_info: {}
}

module.exports._plugin_info = _plugin_info;

module.exports._load = function (_client) {
    client = _client;
    CommandManager.registerPluginCommand("LGRESET", "LGR", "lgreset", "Recommence le jeux", false, lgreset, _plugin_info);
    CommandManager.registerPluginCommand("LGADD", "LGA", "lgadd [joueur1] [joueur2] ...", "Ajoute un joueur au jeux", false, lgadd, _plugin_info);
    CommandManager.registerPluginCommand("LGREMOVE", "LGRM", "lgremove", "Enleve un joueur du jeux", false, lgremove, _plugin_info);
    CommandManager.registerPluginCommand("LGLIST", "LGL", "lglist", "Affiche le nom de tous les joueurs", false, lglist, _plugin_info);
    CommandManager.registerPluginCommand("LGSTART", "LGS", "lgstart", "Commence le jeux (impossible d'enlever des joueurs après)", false, lgstart, _plugin_info);
    CommandManager.registerPluginCommand("LGSTOP", "LGST", "lgstop", "Arrete le jeux", false, lgstart, _plugin_info);
    CommandManager.registerPluginCommand("LGCYCLE", "LGC", "lgcycle", "Passe au cycle jour nuit suivant", false, lgcycle, _plugin_info);

    CommandManager.registerPluginCommand("GENSTACK", undefined, "genstack", "Generate a card stack", false, genstack, _plugin_info);
}

function lgreset(client, message, msg, args) {
    ingame = false;
    players = {};
}

function lgadd(client, message, msg, args) {
    if (!ingame) {
        var mentions = message.mentions.members.array();
        if (mentions.length > 0) {
            var i = 0;
            mentions.forEach((e) => {
                players[e.id] = {
                    user: e,
                    card: undefined,
                    isDead: false,
                    partner: undefined
                }
                i++;
            })
            if (i > 1) {
                message.channel.send(`:white_check_mark: \`${i} joueurs ajoutés\``);
            }
            else {
                message.channel.send(`:white_check_mark: \`1 joueur ajouté\``);
            }
        }
        else {
            message.channel.send(":no_entry: `Veuillez spécifier un/des joueurs(s)`");
        }
    }
    else {
        message.channel.send(":no_entry: `Le jeux a déja commencé`");
    }
}

function lgremove(client, message, msg, args) {
    if (!ingame) {
        var mentions = message.mentions.members.array();
        if (mentions.length > 0) {
            var i = 0;
            mentions.forEach((e) => {
                if (players[e.id]) {
                    delete players[e.id];
                }
                i++;
            })
            if (i > 1) {
                message.channel.send(`:white_check_mark: \`${i} joueurs supprimés\``);
            }
            else {
                message.channel.send(`:white_check_mark: \`1 joueur supprimé\``);
            }
        }
        else {
            message.channel.send(":no_entry: `Veuillez spécifier un/des joueurs(s)`");
        }
    }
    else {
        message.channel.send(":no_entry: `Le jeux a déja commencé`");
    }
}

function lglist(client, message, msg, args) {
    var p = Object.keys(players);
    if (p.length > 0) {
        var str = "";
        p.forEach((e) => {
            str += `● ${players[e].user.user.tag}\n`;
        })
        var embed = new Discord.RichEmbed();
        embed.setColor("BLUE");
        embed.setTitle("Liste des joueurs");
        embed.setDescription(str);
        embed.setFooter(`Nombre de joueurs: ${p.length}`);
        message.channel.send(embed);
    }
    else {
        message.channel.send(":no_entry: `Aucun joueurs`");
    }
}

var currentStep = 0;
function lgstart(client, message, msg, args) {
    var p = Object.keys(players);
    if (p.length >= 4) {
        if (currentStep == 0) {
            gamechannel = message.channel;
            cards = genStack(p.length);
            p.forEach((e) => {
                var card = Utils.getRandomInt(cards.length - 1);
                players[e].user.sendFile(`plugins/loup-garou/resources/images/${GAMECARDSNAMES[cards[card]].toLowerCase()}.png`);
                players[e].card = cards[card];
                cards.splice(card, 1);
            })
            gamechannel.send("Apres une longue journée de travaille, le village s'endort. Maintenant, Cupidon se réveille. qui va-t-il marrier pour la vie ?");
        }
        else {
            currentStep = -1;
        }
        currentStep++;
    }
    else {
        message.channel.send(":no_entry: `Pas assez de joueurs`");
    }
}

function lgstop(client, message, msg, args) {

}

function lgcycle(client, message, msg, args) {

}

function genstack(client, message, msg, args) {
    if (args.length > 1) {
        try {
            var pcount = parseInt(args[1], 10);
            var str = "";
            var cards = genStack(pcount);
            cards.forEach((e) => {
                str += `${GAMECARDSNAMES[e]}\n`;
            })
            message.channel.send(`\`\`\`\n${str}\`\`\``);
        }
        catch (err) {
            message.channel.send(":no_entry: `Invalid player count`" + err.message);
        }
    }
    else {
        message.channel.send(":no_entry: `Tell me what number of cards you need`");
    }
}

function genStack(pcount) {
    var cards = [];
    var punused = pcount;
    for (var i = 0; i < Math.round(pcount / 4.5); i++) {
        cards[pcount - punused] = GAMECARDS.WEREWOLF;
        punused--;
    }
    cards[pcount - punused] = GAMECARDS.BALLGAZER;
    punused--;
    cards[pcount - punused] = GAMECARDS.WITCH;
    punused--;
    if (pcount >= 7) {
        cards[pcount - punused] = GAMECARDS.CUPINDON;
        punused--;
    }
    if (pcount >= 8) {
        cards[pcount - punused] = GAMECARDS.KID;
        punused--;
    }
    if (pcount >= 10) {
        cards[pcount - punused] = GAMECARDS.WHITEWEREWOLF;
        punused--;
        cards[pcount - punused] = GAMECARDS.CRAZY;
        punused--;
        cards[pcount - punused] = GAMECARDS.HUNTER;
        punused--;
    }
    if (pcount >= 13) {
        cards[pcount - punused] = GAMECARDS.FLUTEPLAYER;
        punused--;
    }
    if (pcount >= 14) {
        cards[pcount - punused] = GAMECARDS.THIEF;
        punused--;
    }
    for (var i = punused; i > 0; i--) {
        cards[pcount - punused] = GAMECARDS.VILLAGER;
        punused--;
    }
    return cards;
}