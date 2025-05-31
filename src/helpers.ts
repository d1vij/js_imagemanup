import chalk from "chalk";

import {Image} from "image-js";

type TRed = number;
type TBlue = number;
type TGreen = number;
type TAlpha = number;

export type TPixelData = [TRed, TBlue, TGreen, TAlpha];



function arrayAverage(arr: number[]): number {

    let len = arr.length;
    return arr.length !== 0 ? arraySum(arr) / len : 0;
}


export function arraySum(arr: number[]): number {
    return arr.reduce((a, b) => (a + b), 0);
}


export async function pixelateImage(_image: Image, gridSize: number): Promise<Image> {
    // more the grid size more the samples, more the pixelation

    let _width = _image.width;
    let _height = _image.height;

    let _pixelated = new Image({
        height: _height,
        width: _width
    });

    for (let x = 0; x < _image.width; x += gridSize) {
        for (let y = 0; y < _image.height; y += gridSize) {
            let red: number[] = [];
            let green: number[] = [];
            let blue: number[] = [];
            let alpha: number[] = [];

            //sampling
            for (let dx = 0; dx < gridSize; dx++) {
                for (let dy = 0; dy < gridSize; dy++) {

                    let nextX = x + dx;
                    let nextY = y + dy

                    if (nextX < _width && nextY < _height) {

                        let values = _image.getPixelXY(nextX, nextY);
                        red.push(values[0]);
                        green.push(values[1]);
                        blue.push(values[2]);
                        alpha.push(values[3]);
                    }
                }
            }
            let redAvg = Math.floor(arrayAverage(red));
            let greenAvg = Math.floor(arrayAverage(green));
            let blueAvg = Math.floor(arrayAverage(blue));
            let alphaAvg = Math.floor(arrayAverage(alpha));

            //setting values
            for (let dx = 0; dx < gridSize; dx++) {
                for (let dy = 0; dy < gridSize; dy++) {
                    let nextX = x + dx;
                    let nextY = y + dy

                    if (nextX < _width && nextY < _height) {
                        _pixelated.setPixelXY(x + dx, y + dy, [redAvg, greenAvg, blueAvg, alphaAvg]);
                    }
                }
            }

        }

    }


    return _pixelated;
}

//----------------------------------------------------------------------------
const DENSITIES = {
    LOW: " .:-=+*#%@",
    HIGH: "@#$%&BHGKEVDPQ0OZYXWUYUCLQwonburixtfjv|()/1}{[]?-_+~><i!lI;:,\" ^\`\'. ",
    HIGH2: " .\'\`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnumbowqLCJUYYXZO0QPDVEKGHBSA&EW#%$@"
}
type TDensity = "LOW" | "HIGH" | "HIGH2";
interface IAsciiConfig {
    _image: Image,
    gridSize: number,
    density: TDensity,
    pixelate?: boolean,
    greyscale?: boolean,
    spacing?:number
}

export async function convertToAscii(config: IAsciiConfig): Promise<string> {
    let _image = config._image;
    const _gridSize = config.gridSize
    const _densityString = DENSITIES[config.density];
    const _spacing = ' '.repeat(config.spacing ? config.spacing : 0);

    if (config.pixelate) _image = await pixelateImage(_image, _gridSize);


    let _outString: string = "";
    const scaleFactor = (_densityString.length - 1) / 255 // normalizing brightness to match string density

    const _width = _image.width;
    const _height = _image.height;

    let _index = 0;

    if (config.greyscale) {
        _image = _image.grey();
        
        for (let x = 0; x < _width; x += _gridSize) {
            for (let y = 0; y < _height; y += _gridSize) {
                if (x < _width && y < _height) {
                    _index =Math.floor(_image.getPixelXY(x, y)[0] * scaleFactor)
                    _outString += _spacing + _densityString.at(_index);
                }
            }

            _outString += '\n';
        }
        
    } else {
        let _pixelData = []
        
        
        for (let x = 0; x < _width; x += _gridSize) {
            for (let y = 0; y < _height; y += _gridSize) {
                if (x < _width && y < _height) {
                    _pixelData = _image.getPixelXY(x,y).slice(0,3);
                    _index = Math.floor(arrayAverage(_pixelData) * scaleFactor)

                    
                    _outString += _spacing +  chalk.rgb(_pixelData[0], _pixelData[1], _pixelData[2])( _densityString.at(_index));
                }
            }

            _outString += '\n';
        }

        _image.getPixelsArray()
        
    }
    return _outString;
}








