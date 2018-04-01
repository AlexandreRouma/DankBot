var fs = require("fs");
var path = require("path");
var Logger = require("./logger");

var plugins = {}

module.exports.loadPlugins = function () {
    fs.readdirSync("plugins/").forEach(file => {
        var name = path.basename(file);
        Logger.log(`Loading ${name}...`);
        try {
            var plugin = require("./plugins/" + file);
            var plugin_info = plugin._plugin_info;
            if (plugin_info) {
                if (plugin_info.name) {
                    if (/^[a-z0-9_-]+$/g.test(plugin_info.name)) {
                        plugin._load();
                        plugins[plugin_info.name];
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
            Logger.panic(`Couldn't load ${name}`);
        }
    })
}

module.exports.getPlugins = function () {
    return plugins;
}