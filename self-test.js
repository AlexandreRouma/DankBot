/* eslint-disable */
var Discord = require("discord.js");
var Logger = require("./logger");

var testn = 0;

var tests = [
    (lastAnwser) => {
        Logger.log("Testing 'say'...");
        sendFakeMessage(";say success");
    },

    (lastAnwser) => {
        if (lastAnwser === "```success```") Logger.ok();
        else {
            Logger.failed();
            Logger.panic("Self test failed!" + lastAnwser);
        }
        Logger.log("Testing 'calculate'...");
        sendFakeMessage(";calculate 1 + 1");
    },

    (lastAnwser) => {
        if (lastAnwser === "```1 + 1 = 2```") Logger.ok();
        else {
            Logger.failed();
            Logger.panic("Self test failed!");
        }
        Logger.log("Testing 'calc'...");
        sendFakeMessage(";calc 1 + 1");
    },

    (lastAnwser) => {
        if (lastAnwser === "```1 + 1 = 2```") Logger.ok();
        else {
            Logger.failed();
            Logger.panic("Self test failed!");
        }
        Logger.log("Testing 'help'...");
        sendFakeMessage(";help");
    },

    (lastAnwser) => {
        if (lastAnwser === "https://github.com/AlexandreRouma/DankBot/wiki/Command-List") Logger.ok();
        else {
            Logger.failed();
            Logger.panic("Self test failed!");
        }
        Logger.log("Testing 'ping'...");
        sendFakeMessage(";ping");
    },

    (lastAnwser) => {
        if (lastAnwser.startsWith(":white_check_mark:")) {
            Logger.ok()
        }
        else {
            Logger.failed();
            Logger.panic("Self test failed!");
        }
        Logger.log("Testing 'lonely'...");
        sendFakeMessage(";lonely");
    },

    (lastAnwser) => {
        if (lastAnwser === "@everyone") Logger.ok();
        else {
            Logger.failed();
            Logger.panic("Self test failed!");
        }
        Logger.log("Testing 'base64encode'...");
        sendFakeMessage(";base64encode success");
    },

    (lastAnwser) => {
        if (lastAnwser === "```c3VjY2Vzcw==```") Logger.ok();
        else {
            Logger.failed();
            Logger.panic("Self test failed!" + lastAnwser);
        }
        Logger.log("Testing 'b64e'...");
        sendFakeMessage(";b64e success");
    },

    (lastAnwser) => {
        if (lastAnwser == "```c3VjY2Vzcw==```") Logger.ok();
        else {
            Logger.failed();
            Logger.panic("Self test failed!" + lastAnwser);
        }
        Logger.log("Testing 'base64decode'...");
        sendFakeMessage(";base64decode c3VjY2Vzcw==");
    },

    (lastAnwser) => {
        if (lastAnwser == "```success```") Logger.ok();
        else {
            Logger.failed();
            Logger.panic("Self test failed!" + lastAnwser);
        }
        Logger.log("Testing 'b64d'...");
        sendFakeMessage(";b64d c3VjY2Vzcw==");
    },

    (lastAnwser) => {
        if (lastAnwser == "```success```") Logger.ok();
        else {
            Logger.failed();
            Logger.panic("Self test failed!" + lastAnwser);
        }
        Logger.log("Done.\n");
    },
];

function startTest() {
    Logger.log("STARTING SELF TEST\n");
    tests[0]("");
}

module.exports.FakeDiscordClient = {
    login: FakeDiscordClient_login,
    on: FakeDiscordClient_on,
    user: {
        setPresence: () => { },
        setActivity: () => { },
        tag: "fake-bot#1234",
        username: "fake-bot",
        discriminator: "1234",
        id: "111111111111111111"
    }
}

var fakeDiscordUser = {
    setPresence: () => { },
    setActivity: () => { },
    tag: "fake-user#1234",
    username: "fake-user",
    discriminator: "1234",
    id: "000000000000000000",
    roles: []
}

var fakeGuildMember = {
    setPresence: () => { },
    setActivity: () => { },
    tag: "fake-user#1234",
    username: "fake-user",
    discriminator: "1234",
    id: "000000000000000000",
    roles: {
        array: () => {
            return [{id: "2222222222222222222"}]
        }
    }
}

var fakeDiscordChannel = {
    send: (data) => {
        testn++;
        tests[testn](data);
    },
    startTyping: () => { },
    stopTyping: () => { }
}

async function FakeDiscordClient_login(token) {
    actions["ready"]();
    startTest();
}

var actions = {}

function FakeDiscordClient_on(str, func) {
    actions[str] = func;
}

function sendFakeMessage(msg) {
    var message = new Discord.Message();
    message.author = fakeDiscordUser;
    message.content = msg;
    message.channel = fakeDiscordChannel;
    message.member = fakeGuildMember;
    actions["message"](message);
}
/* eslint-enable */