"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.representativeValue = exports.median = exports.average = exports.imgConvert = void 0;
/**
 * comvert image
 * @param img Jimp img object
 * @param w Width
 * @param h height
 * @param sequence 'rg'(resize->grayscale) 'gr'(grayscale->resize)
 */
const imgConvert = (img, w, h, sequence) => {
    if (sequence === 'rg') {
        img.resize(w, h, 'BICUBIC');
        img.grayscale();
    }
    else {
        img.grayscale();
        img.resize(w, h, 'BICUBIC');
    }
};
exports.imgConvert = imgConvert;
/**
 * get Average (mean)
 * @param array 2-dimensional array
 * @returns average
 */
const average = (array) => {
    const values = array.flat();
    const sum = values.reduce((pre, cur) => pre + cur, 0);
    return sum / values.length;
};
exports.average = average;
/**
 * get Median
 * @param array 2-dimensional array
 * @returns median value
 */
const median = (array) => {
    const values = array.flat();
    values.sort();
    const size = values.length;
    return (size % 2 === 1 ? values[size / 2 | 0] : (values[size / 2 - 1] + values[size / 2]) / 2);
};
exports.median = median;
/**
 * get representantive value
 * @param array 2-dimensional array
 * @param represent average | median
 * @returns representantive value
 */
const representativeValue = (array, represent) => (represent === 'average' ? (0, exports.average)(array) : (0, exports.median)(array));
exports.representativeValue = representativeValue;
//# sourceMappingURL=util.js.map