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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pixelateImage = exports.arraySum = void 0;
const image_js_1 = __importDefault(require("image-js"));
function average(arr) {
    let len = arr.length;
    return arr.length !== 0 ? arraySum(arr) / len : 0;
}
function arraySum(arr) {
    return arr.reduce((a, b) => (a + b), 0);
}
exports.arraySum = arraySum;
function pixelateImage(_image, gridSize) {
    return __awaiter(this, void 0, void 0, function* () {
        // more the grid size more the samples, more the pixelation
        let _width = _image.width;
        let _height = _image.height;
        let _pixelated = new image_js_1.default({
            height: _height,
            width: _width
        });
        for (let x = 0; x < _image.width; x += gridSize) {
            for (let y = 0; y < _image.height; y += gridSize) {
                let red = [];
                let green = [];
                let blue = [];
                let alpha = [];
                //sampling
                for (let dx = 0; dx < gridSize; dx++) {
                    for (let dy = 0; dy < gridSize; dy++) {
                        let nextX = x + dx;
                        let nextY = y + dy;
                        if (nextX < _width && nextY < _height) {
                            let values = _image.getPixelXY(nextX, nextY);
                            red.push(values[0]);
                            green.push(values[1]);
                            blue.push(values[2]);
                            alpha.push(values[3]);
                        }
                    }
                }
                let redAvg = Math.floor(average(red));
                let greenAvg = Math.floor(average(green));
                let blueAvg = Math.floor(average(blue));
                let alphaAvg = Math.floor(average(alpha));
                //setting values
                for (let dx = 0; dx < gridSize; dx++) {
                    for (let dy = 0; dy < gridSize; dy++) {
                        let nextX = x + dx;
                        let nextY = y + dy;
                        if (nextX < _width && nextY < _height) {
                            _pixelated.setPixelXY(x + dx, y + dy, [redAvg, greenAvg, blueAvg, alphaAvg]);
                        }
                    }
                }
            }
        }
        return _pixelated;
    });
}
exports.pixelateImage = pixelateImage;
// export async function convertToAscii(_image: Image, gridSize:number) : Promise<Image>{
// }
