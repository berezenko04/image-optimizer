import sharp from "sharp";
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import fs from "fs";
import path from "path";

const inputFolderPath = "input/";

const outputFolderPath = "output/";

if (!fs.existsSync(outputFolderPath)) {
  fs.mkdirSync(outputFolderPath);
}

if (!fs.existsSync(inputFolderPath)) {
  fs.mkdirSync(inputFolderPath);
}

async function optimizeImages() {
  try {
    const files = fs.readdirSync(inputFolderPath);

    for (const file of files) {
      const inputFilePath = path.join(inputFolderPath, file);
      const outputFileName = `${path.parse(file).name}.webp`;
      const outputFilePath = path.join(outputFolderPath, outputFileName);

      const resizedImage = await sharp(inputFilePath)
        .resize(1000, 1000, { fit: "inside" })
        .toBuffer();

      const optimizedImageBuffer = await imagemin.buffer(resizedImage, {
        plugins: [imageminWebp({ quality: 100 })],
      });

      fs.writeFileSync(outputFilePath, optimizedImageBuffer);
    }

    console.log("Images optimized successfully.");
  } catch (error) {
    console.error("Error optimizing images:", error);
  }
}

optimizeImages();
