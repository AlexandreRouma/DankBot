var splash_screen = "    ____              __   ____  ____  ______\n" +
                    "   / __ \\____ _____  / /__/ __ )/ __ \\/_  __/\n" +
                    "  / / / / __ `/ __ \\/ //_/ __  / / / / / /   \n" +
                    " / /_/ / /_/ / / / / ,< / /_/ / /_/ / / /    \n" +
                    "/_____/\\__,_/_/ /_/_/|_/_____/\\____/ /_/     \n" +
                    "                                             \n";

module.exports.displaySplash = function () {
    process.stdout.write(splash_screen);
};