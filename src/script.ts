// import Image from "image-js";
// import { pixelateImage ,convertToAscii} from "./helpers.js";

// let out = document.getElementById('out') as HTMLImageElement;
// let _in = document.getElementById('input-image') as HTMLImageElement;
// const scale = 0.5
// let outtext = document.getElementById('txt') as HTMLParagraphElement;


// async function main(){
//     let image = await Image.load("../content/flower.png");
    
//     out.src = image.toDataURL();
//     outtext.textContent = await convertToAscii({
//         _image:image,
//         density:"HIGH2",
//         gridSize:8,
//         pixelate:true,
//         color:false,
//         spacing:0
//     })
//     out.height *= scale;
//     out.width += scale;
// }

// main().catch(console.log);