const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

exports.generateImage = async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = path.resolve(__dirname, '../uploads', `${file.filename}.htm`);
    fs.renameSync(file.path, filePath);

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`file://${filePath}`);
        await page.setViewport({ width: 1280, height: 720 });

        const imagePath = path.resolve(__dirname, '../uploads/thumbnail.png');
        await page.screenshot({
            path: imagePath,
            clip: { x: 0, y: 0, width: 200, height: 150 }
        });

        await browser.close();
        fs.unlinkSync(filePath);

        res.sendFile(imagePath, err => {
            if (err) {
                res.status(500).send('Error sending image.');
            } else {
               // fs.unlinkSync(imagePath);
            }
        });
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred.' + error.message);
    }
};
