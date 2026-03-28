import Jimp from 'jimp';

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

            // If it's a non-transparent pixel and NOT pure white
            if (a > 10 && !(r > 240 && g > 240 && b > 240)) {
                
                // If the pixel is greyscale/blackish (not a distinct color like the grey briefcase part)
                // Assuming the grey briefcase part is relatively light (e.g. > 150)
                // Black text will be very dark (r,g,b < 50)
                // Let's recolor anything darker than 120 (which covers anti-aliased black edges too)
                if (r < 180 && g < 180 && b < 180) {
                    
                    // We map the lightness of the black pixel to the target blue.
                    // Since it's black text, it should be fully solid blue, except for anti-aliasing edges 
                    // To preserve anti-aliasing against transparent backgrounds, 
                    // we just change the RGB to the target Blue, and the Alpha remains the same!
                    
                    // But wait, if it's anti-aliased against white (e.g. gray pixel, A=255)
                    // We need to tint it towards white.
                    
                    const lightness = Math.max(r, g, b) / 255; // 0 for black, ~0.5 for grey edge
                    
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
