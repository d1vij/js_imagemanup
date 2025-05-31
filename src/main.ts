import {Image} from "image-js";
import { convertToAscii } from "./helpers.js";


async function main() {
    
    let image = await Image.load("./content/spongebob.jpg");
    let asciistring = await convertToAscii({
        _image : image,
        density: "HIGH",
        gridSize: 12,
        returnAs: "string",
        color:true,
        pixelate: true
    })
    
    console.log(asciistring)
    
}



main().catch(console.log);