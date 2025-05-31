import {Image} from "image-js";
import { convertToAscii } from "./helpers.js";


async function main() {
    
    let image = await Image.load("./content/spongebob.jpg");
    image = image.rotate(-90)
    let asciiString = await convertToAscii({
        _image:image,
        density:"HIGH2",
        gridSize:10,
        greyscale:false,
        pixelate:true,
        spacing:0
    })

    console.log(asciiString);
}



main().catch(console.log);