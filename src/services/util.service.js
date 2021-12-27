export const utilService = {
    debounce,
    typeOf,
    sortByIds,
    deepCopy,
    deepCompare,
    deepCompareArray,
    futureRun,
    randomHexColor,
    saveToStorage,
    loadFromStorage,
    loadFromJSON,
    setMinMax,
    makeId,
    sentenceToKababCase,
    sentenceToCamelCase,
    camelCaseToSentence,
    imageLoader,
    getImgAvgColor,
    getImgDominantColor,
    getBase64FromUrl,
    isHexColorLight,
}

export function getShortSentence(str, length = 48) {
    if (str.length < length) return str;
    var res = str.substr(0, length);
    res = str.substr(0, Math.min(res.length, res.lastIndexOf(" ")));
    return res + '...';
}

export function padTime(time) {
    return(time+'').padStart(2, '0')
}

export async function getBase64FromUrl(url) {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
        }
    });
}

export function imageLoader(url) {
    return new Promise((resolve, reject) => {
        var img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('load image failed'));
    })
}

export function getImgAvgColor(img, width, height, rangeW, rangeH, startX = 0, startY = 0) {
    width ??= img.width;
    height ??= img.height;
    rangeW ??= width;
    rangeH ??= height;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    const data = ctx.getImageData(startX, startY, rangeW, rangeH).data;
    var i = -4, rgb = { r: 0, g: 0, b: 0 };
    while ((i += 4) < data.length) {
        rgb.r += data[i];
        rgb.g += data[i + 1];
        rgb.b += data[i + 2];
    }
    rgb.r /= data.length / 4;
    rgb.g /= data.length / 4;
    rgb.b /= data.length / 4;
    var hex = "#" + ("000000" + rgbToHex(rgb.r, rgb.g, rgb.b)).slice(-6);
    console.log(hex, startX, startY, rangeW, rangeH);
    return hex;
}

export function getImgDominantColor(img) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, 1, 1);
    const rgb = ctx.getImageData(0, 0, 1, 1).data;
    var hex = "#" + ("000000" + rgbToHex(rgb[0], rgb[1], rgb[2])).slice(-6);
    return hex;
}

export function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) return;
    return ((r << 16) | (g << 8) | b).toString(16);
}

export function isHexColorLight(color) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 155;
}

export function sentenceToKababCase(str) {
    return str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');
}

export function sentenceToCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export function camelCaseToSentence(input, isOnlyFirst = true) {
    if (!input) return;
    if (typeof input === 'string') input = [input];
    return input.map(key => key.replace(/[A-Z]/g, letter => (isOnlyFirst) ? ` ${letter.toLowerCase()}` : ` ${letter}`).replace(/[a-z]/, letter => letter.toUpperCase())).join(' » ')
};

export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
};

export function sortByIds(arr, ids, key = 'id') {
    return arr.sort((el1, el2) => ids.indexOf(el1[key]) - ids.indexOf(el2[key]))
};

export function setMinMax(value, min = 0, max = 100) {
    return Math.min(Math.max(value, min), max);
}

export function typeOf(obj) {
    return /[\s-]\w+(|\])/.exec(Object.prototype.toString.call(obj))[0].trim();
}

function saveToStorage(key, value) {
    if (!value) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}


const DEBOUNCES = {};
export function debounce(fn, id = 0, delay = 500) {
    clearTimeout(DEBOUNCES[id]);
    DEBOUNCES[id] = null;
    return ((...args) => {
        DEBOUNCES[id] = setTimeout(() => {
            delete DEBOUNCES[id];
            fn(...args);
        }, delay);
    })();
}

export async function futureRun(ms, fn) {
    const timer = (ms) => new Promise(res => setTimeout(res, ms));
    await timer(ms);
    return fn();
}

export function randomHexColor() {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
}

function loadFromJSON(url = '/demo/demo.json') {
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);
    return JSON.parse(request.responseText);
}

function deepCompareArray(arr1, arr2) {
    const float_obj1 = _floatObject(arr1);
    const float_obj2 = _floatObject(arr2);
    var res = [];
    arr1 = Object.fromEntries(
        Object.entries(float_obj1).filter(([key, value]) => value !== float_obj2[key]))
    arr2 = Object.fromEntries(
        Object.entries(float_obj2).filter(([key, value]) => value !== float_obj1[key]));
    const merged = { ...arr1, ...arr2 };
    for (var key in merged) {
        const value1 = arr1[key];
        const value2 = arr2[key];
        if (value1 === value2) continue;
        if (_objectType(value1).date && _objectType(value2).date && value1.getTime() === value2.getTime()) continue;
        if (!res.includes(parseInt(key.split(',')[0]))) res.push(parseInt(key.split(',')[0]));
    }
    return res;
}

export function deepCompare(obj1, obj2) {
    const VALUE_CREATED = "CREATED";
    const VALUE_UPDATED = "UPDATED";
    const VALUE_DELETED = "DELETED";
    const float_obj1 = _floatObject(obj1);
    const float_obj2 = _floatObject(obj2);

    obj1 = Object.fromEntries(
        Object.entries(float_obj1).filter(([key, value]) => value !== float_obj2[key]))
    obj2 = Object.fromEntries(
        Object.entries(float_obj2).filter(([key, value]) => value !== float_obj1[key]));
    const merged = { ...obj1, ...obj2 };

    var res = [];
    for (var key in merged) {
        const value1 = obj1[key];
        const value2 = obj2[key];
        if (value1 === value2) continue;
        if (_objectType(value1).date && _objectType(value2).date && value1.getTime() === value2.getTime()) continue;
        var type = VALUE_UPDATED;
        if (value1 === undefined) type = VALUE_CREATED;
        if (value2 === undefined) type = VALUE_DELETED;
        res.push({ type, timestamp: Date.now(), data: { key, value: (value2) ? value2 : value1, previous: value1 } })
    }
    return res;
}

function _objectType(obj) {
    const type = Object.prototype.toString.call(obj);
    return {
        date: type === "[object Date]",
        array: type === "[object Array]",
        object: type === "[object Object]",
        value: type !== "[object Array]" && type !== "[object Object]",
        function: type === "[object Function]",
    }
}

function _floatObject(obj, path = [], map = {}) {
    if (_objectType(obj).object || _objectType(obj).array) {
        for (var key in obj) {
            if (key[0] === '_') continue;
            const value = obj[key];
            if (_objectType(value).object || _objectType(value).array) {
                _floatObject(value, path.concat([key]), map);
            } else {
                key = (path.length) ? path + ',' + key : key;
                map[key] = value;
            }
        }
    }
    return map;
}

export function makeId(length = 8) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
