const Jimp = require('jimp');

async function colorize() {
    try {
        const image = await Jimp.read('src/assets/image.png');
        
        // Target blue color based on standard blue logos (#003ACA)
        const targetR = 0;
        const targetG = 58;
        const targetB = 202;

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            const a = this.bitmap.data[idx + 3];

            if (a > 10 && !(r > 240 && g > 240 && b > 240)) {
                if (r < 120 && g < 120 && b < 120) {
                    const lightness = Math.max(r, g, b) / 255;
                    this.bitmap.data[idx + 0] = targetR + (255 - targetR) * lightness;
                    this.bitmap.data[idx + 1] = targetG + (255 - targetG) * lightness;
                    this.bitmap.data[idx + 2] = targetB + (255 - targetB) * lightness;
                }
            }
        });

        await image.writeAsync('src/assets/image.png');
        console.log('Successfully colorized image.png');
    } catch (err) {
        console.error('Error colorizing image:', err);
    }
}

colorize();
