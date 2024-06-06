
import multer from 'multer';
import path from 'path';
import fs from 'fs';

function getFileTypeByExtension(fileName) {
    const fileExtension = path.extname(fileName).toLowerCase();

    switch (fileExtension) {
        case '.jpg':
        case '.jpeg':
        case '.png':
        case '.gif':
        case '.bmp':
        case '.svg':
        case '.webp':
        case '.ico':
        case '.tiff':
        case '.tif':
            return fileExtension.replace('.', '');
        default:
            return 'unknown';
    }
}




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const fileType = getFileTypeByExtension(file.originalname);
        let uploadPath = '';

        if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png' || fileType === 'gif' || fileType === "bmp" || fileType === "svg" || fileType === "webp" || fileType === "ico" || fileType === "tiff" || fileType === "tif") {
            uploadPath = `public/profiles/`;
        } else {
            
            uploadPath = 'public/unknown/';
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });


export const uploadImage = (imageFieldName) => {
    return (req, res, next) => {
        upload.single(imageFieldName)(req, res, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const imageUrl = `https://${req.get('host')}/public/profiles/${req.file.filename}`;

            if (req.file.size > 3000000) {
                fs.unlinkSync(req.file.path)
                return res.status(500).json({ "error": "Imagen excede el limite de 3 MB" })
            };

            req.imageBlankUrl = req.file.filename;
            req.imageUrl = imageUrl;

            next();
        });
    };
};