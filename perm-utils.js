const ConfigUtils = require("./config-utils");

module.exports.isAdmin = function (user) {
    var ret = false;
    ConfigUtils.getconfig().BotAdminRoles.forEach((e) => {
        user.roles.array().forEach((r) => {
            if (e === r.id) {
                ret = true;
            }
        });
    });
    return ret;
};