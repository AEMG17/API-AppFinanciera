
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Funciona para comprobar la extension del archivo
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
            // Crea una carpeta para cada tipo de archivo
            uploadPath = `public/profiles/`;
        } else {
            // Si el tipo de archivo es desconocido, guarda en 'uploads/unknown/'
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

            // Construir la URL de la imagen basada en la configuración de storage
            const imageUrl = `https://${req.get('host')}/public/profiles/${req.file.filename}`;

            if (req.file.size > 3000000) {
                fs.unlinkSync(req.file.path)
                return res.status(500).json({ "error": "Imagen excede el limite de 3 MB" })
            };

            req.imageBlankUrl = req.file.filename;
            req.imageUrl = imageUrl;

            // Continúa con el siguiente middleware o manejo de la ruta
            next();
        });
    };
};