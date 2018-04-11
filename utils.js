module.exports.getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
};

module.exports.crop = function (str, length) {
    if (str.length > length) {
        return `${str.substring(0, length - 3)}...`;
    }
    else {
        return str;
    }
};

module.exports.pad = function (str, c, length) {
    var spaces = "";
    for (var i = 0; i < length - str.length; i++) {
        spaces += c;
    }
    return str + spaces;
};

module.exports.getHue = function (r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    var max = r;
    max = Math.max(max, g);
    max = Math.max(max, b);
    var min = r;
    min = Math.min(min, g);
    min = Math.min(min, b);
    var delta = max - min;
    var lum = (max + min) / 2;
    var sat = 0;
    if (lum > 0.5) {
        sat = delta / (2 * lum);
    }
    else {
        sat = delta / (2.0 - delta);
    }
    if (r === max) {
        return {
            luminance: lum,
            saturation: sat,
            hue: (g - b) / delta
        };
    }
    else if (g === max) {
        return {
            luminance: lum,
            saturation: sat,
            hue: 2.0 + ((b - r) / delta)
        };
    }
    else {
        return {
            luminance: lum,
            saturation: sat,
            hue: 4.0 + ((r - g) / delta)
        };
    }
};