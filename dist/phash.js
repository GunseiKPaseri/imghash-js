import ImgHash from "./ImgHash";
const PHASH_SAMPLE_SIZE = 32;
const INV_SQRT_2 = 1 / Math.sqrt(2.0);
const DCTCoefficients = (n) => (n === 0 ? INV_SQRT_2 : 1);
const MemoCOS = {};
const initCOS = (N) => {
    if (MemoCOS[N])
        return MemoCOS[N];
    MemoCOS[N] = new Array(N);
    const cosines = MemoCOS[N];
    for (let k = 0; k < N; k++) {
        cosines[k] = new Array(N);
        const t = ((2 * k + 1) / (2.0 * N)) * Math.PI;
        for (let n = 0; n < N; n++) {
            cosines[k][n] = Math.cos(t * n);
        }
    }
    return cosines;
};
let COS = initCOS(PHASH_SAMPLE_SIZE);
const applyDCT = (f, size, sampleSize) => {
    COS = initCOS(sampleSize);
    const F = new Array(size);
    for (let u = 0; u < size; u++) {
        F[u] = new Array(size);
        for (let v = 0; v < size; v++) {
            let sum = 0;
            for (let i = 0; i < sampleSize; i++) {
                for (let j = 0; j < sampleSize; j++) {
                    sum += COS[i][u] * COS[j][v] * f[i][j];
                }
            }
            F[u][v] = sum * (DCTCoefficients(u) * DCTCoefficients(v)) / 4;
        }
    }
    return F;
};
/**
 * Perseptual Hash (use DCT)
 * @param img Jimp object (**Destroyable**)
 * @param option DCT Sampling Square size(=32) & Low frequencies Square Size(=8) O(DCTSize^2 * lowSize^2)
 * @returns phash
 */
const phash = (img, option = { DCTSize: 32, lowSize: 8 }) => {
    img
        .resize(option.DCTSize, option.DCTSize)
        .grayscale();
    const imgarray = new Array(option.DCTSize);
    for (let x = 0; x < option.DCTSize; x++) {
        imgarray[x] = new Array(option.DCTSize);
        for (let y = 0; y < option.DCTSize; y++) {
            imgarray[x][y] = (img.getPixelColor(x, y) >> 16) & 0xff;
        }
    }
    const dct = applyDCT(imgarray, option.lowSize, option.DCTSize);
    let sum = 0;
    for (let x = 0; x < option.lowSize; x++) {
        for (let y = 0; y < option.lowSize; y++) {
            sum += dct[x][y];
        }
    }
    const avg = sum / (option.lowSize * option.lowSize);
    let result = '';
    for (let x = 0; x < option.lowSize; x++) {
        for (let y = 0; y < option.lowSize; y++) {
            result += (dct[x][y] > avg ? '1' : '0');
        }
    }
    return new ImgHash('phash', result, 'bin');
};
export default phash;
//# sourceMappingURL=phash.js.map