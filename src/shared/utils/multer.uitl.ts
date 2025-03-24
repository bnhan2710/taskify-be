import multer from 'multer'
import path from 'path';

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/')); 
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
    }
})


export const upload = multer({ storage: multerStorage })