const fs = require("fs");
const path = require("path");
const Logger = require("./logger");
const CommandManager = require("./command-manager");

var plugins = {};

module.exports.loadPlugins = function (client) {
    fs.readdirSync("plugins/").forEach((file) => {
        var name = path.basename(file);
        if (name.endsWith(".js")) {
            Logger.log(`Loading ${name}...`);
            try {
                var plugin = require(`./plugins/${file}`);
                var plugin_info = plugin._plugin_info;
                if (plugin_info) {
                    if (plugin_info.name) {
                        if (/^[a-z0-9_-]+$/g.test(plugin_info.name)) {
                            plugins[plugin_info.name] = plugin_info;
                            plugin._load(client);
                            Logger.ok();
                        }
                        else {
                            Logger.failed();
                            Logger.panic(`Couldn't load ${name} (Invalid character in plugin name)`);
                        }
                    }
                    else {
                        Logger.failed();
                        Logger.panic(`Couldn't load ${name} (No plugin name supplied)`);
                    }
                }
                else {
                    Logger.failed();
                    Logger.panic(`Couldn't load ${name} (No plugin info)`);
                }
            }
            catch (err) {
                Logger.failed();
                Logger.panic(`Couldn't load ${name}\n${err}`);
            }
        }
    });
};

module.exports.getPlugins = function () {
    return plugins;
};

module.exports.registerCommand = function (name, alias, usage, description, adminonly, handler, plugin) {
    if (!plugins[plugin.name].commands) plugins[plugin.name].commands = {};
    plugins[plugin.name].commands[name] = {
        name: name,
        alias: alias,
        usage: usage,
        description: description,
        adminonly: adminonly,
        handler: handler,
        plugin: plugin
    };
    CommandManager.registerCommand(name, alias, usage, description, adminonly, handler, plugin);
};