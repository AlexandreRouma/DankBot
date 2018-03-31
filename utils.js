module.exports.getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
}

module.exports.crop = function (str, length) {
    if (str.length > length) {
        return str.substring(0, length - 3) + "...";
    }
    else {
        return str;
    }
}

module.exports.pad = function (str, c, length) {
    var spaces = "";
    for (var i = 0; i < length - str.length; i++) {
        spaces += c;
    }
    return str + spaces;
}