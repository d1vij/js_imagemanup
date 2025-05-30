import  {Image}  from "image-js";

import {pixelateImage} from "./helpers.js";
import {arraySum} from "./helpers.js"
import {TPixelData} from "./helpers.js"
import { exit } from "process";


const DENSITIES = {
    LOW: " .:-=+*#%@",
    HIGH: "@#$%&BHGKEVDPQ0OZYXWUYUCLQwonburixtfjv|()/1}{[]?-_+~><i!lI;:,\" ^\`\'.",
    HIGH2:  " .\'\`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnumbowqLCJUYYXZO0QPDVEKGHBSA&EW#%$@"
}

let GRIDSIZE = 4


async function main() {
    let sb = (await Image.load("./content/e.png")).rotateLeft().resize({factor:4})
    
    let pixsb = await pixelateImage(sb, GRIDSIZE);
    let greysb = pixsb.grey();
    greysb.save("./content/grey.jpg");
    let asciiStr = await asciitize(greysb, GRIDSIZE);
    
    
    console.log(asciiStr)

    console.log(`Characters : ${Math.floor((sb.height * sb.width) / (GRIDSIZE * GRIDSIZE))}`);
}


async function asciitize(_image:Image, GRIDSIZE:number) : Promise<string>{

    
    let asciiStr = ""

    let width = _image.width;
    let height = _image.height
    let avgBrightness: number = 0;

    let densityString = DENSITIES.HIGH2;

    let densityStringIndex = 0;

    let scaleFactor = (densityString.length - 1) / 255;
    
    for(let x=0; x < width; x+=GRIDSIZE){
        for(let y=0; y < height; y+=GRIDSIZE){

            if (x < width && y < height) {
                // avgBrightness = Math.floor(arraySum(_image.getPixelXY(x, y).slice(0,3)) / 3);

                avgBrightness = (_image.getPixelXY(x,y)[0]) * scaleFactor  ; // for bw
            }
            
            densityStringIndex = Math.floor(avgBrightness);
            
            asciiStr += densityString.at(densityStringIndex)?.repeat(2);
        }
        asciiStr += "\n";
    }

    return asciiStr;
}














main().catch(console.log);



