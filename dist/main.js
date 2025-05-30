"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_js_1 = require("image-js");
const helpers_js_1 = require("./helpers.js");
const DENSITIES = {
    LOW: " .:-=+*#%@",
    HIGH: "@#$%&BHGKEVDPQ0OZYXWUYUCLQwonburixtfjv|()/1}{[]?-_+~><i!lI;:,\" ^\`\'.",
    HIGH2: " .\'\`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnumbowqLCJUYYXZO0QPDVEKGHBSA&EW#%$@"
};
let GRIDSIZE = 4;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let sb = (yield image_js_1.Image.load("./content/e.png")).rotateLeft().resize({ factor: 4 });
        let pixsb = yield (0, helpers_js_1.pixelateImage)(sb, GRIDSIZE);
        let greysb = pixsb.grey();
        greysb.save("./content/grey.jpg");
        let asciiStr = yield asciitize(greysb, GRIDSIZE);
        console.log(asciiStr);
        console.log(`Characters : ${Math.floor((sb.height * sb.width) / (GRIDSIZE * GRIDSIZE))}`);
    });
}
function asciitize(_image, GRIDSIZE) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let asciiStr = "";
        let width = _image.width;
        let height = _image.height;
        let avgBrightness = 0;
        let densityString = DENSITIES.HIGH2;
        let densityStringIndex = 0;
        let scaleFactor = (densityString.length - 1) / 255;
        for (let x = 0; x < width; x += GRIDSIZE) {
            for (let y = 0; y < height; y += GRIDSIZE) {
                if (x < width && y < height) {
                    // avgBrightness = Math.floor(arraySum(_image.getPixelXY(x, y).slice(0,3)) / 3);
                    avgBrightness = (_image.getPixelXY(x, y)[0]) * scaleFactor; // for bw
                }
                densityStringIndex = Math.floor(avgBrightness);
                asciiStr += (_a = densityString.at(densityStringIndex)) === null || _a === void 0 ? void 0 : _a.repeat(2);
            }
            asciiStr += "\n";
        }
        return asciiStr;
    });
}
main().catch(console.log);
