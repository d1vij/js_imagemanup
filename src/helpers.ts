import { TranscodeEncoding } from "buffer";
import { LargeNumberLike } from "crypto";
import Image from "image-js";

type TRed = number;
type TBlue = number;
type TGreen = number;
type TAlpha = number;

export type TPixelData = [TRed, TBlue, TGreen, TAlpha];



function average(arr: number[]): number {

    let len = arr.length;
    return arr.length !== 0 ? arraySum(arr) / len : 0;
}


export function arraySum(arr: number[]) : number {
    return arr.reduce((a,b) => (a+b), 0);
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
            let redAvg = Math.floor(average(red));
            let greenAvg = Math.floor(average(green));
            let blueAvg = Math.floor(average(blue));
            let alphaAvg = Math.floor(average(alpha));

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



// export async function convertToAscii(_image: Image, gridSize:number) : Promise<Image>{

// }









