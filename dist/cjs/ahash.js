"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AHASH_PRESET = void 0;
const tslib_1 = require("tslib");
const ImgHash_js_1 = tslib_1.__importDefault(require("./ImgHash.js"));
const util_js_1 = require("./util.js");
const AHASH_SAMPLE_SIZE = 8;
/**
 * PyPI ImgHash (https://pypi.org/project/imghash/)
 * `imghash.average_hash`
 */
const PyPIImgHash = {
    convertSequence: 'gr',
    byteReader: 'vertically'
};
/**
 * AHASH option preset
 */
exports.AHASH_PRESET = { PyPIImgHash };
/**
 * Averave Hash
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns ahash
 */
const ahash = (img, option = {}) => {
    var _a, _b;
    const sampleSize = (_a = option.sampleSize) !== null && _a !== void 0 ? _a : AHASH_SAMPLE_SIZE;
    const convertSequence = (_b = option.convertSequence) !== null && _b !== void 0 ? _b : 'rg';
    const isByteReadingHorizontally = option.byteReader !== 'vertically';
    (0, util_js_1.imgConvert)(img, sampleSize, sampleSize, convertSequence);
    const imgarray = new Array(sampleSize);
    for (let x = 0; x < sampleSize; x++) {
        imgarray[x] = new Array(sampleSize);
        for (let y = 0; y < sampleSize; y++) {
            imgarray[x][y] = (img.getPixelRGB(x, y) >> 16) & 0xff;
        }
    }
    const avg = (0, util_js_1.average)(imgarray);
    let result = '';
    for (let x = 0; x < sampleSize; x++) {
        for (let y = 0; y < sampleSize; y++) {
            result += ((isByteReadingHorizontally ? imgarray[x][y] : imgarray[y][x]) > avg ? '1' : '0');
        }
    }
    return new ImgHash_js_1.default('ahash', result, 'bin');
};
exports.default = ahash;
//# sourceMappingURL=ahash.js.map