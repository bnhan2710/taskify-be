import multer from 'multer';
import path from 'path';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerUpload = multer({ storage: multerStorage });

export const upload = {
  single: (fieldName: string) => multerUpload.single(fieldName),
  array: (fieldName: string, maxCount: number) => multerUpload.array(fieldName, maxCount),
  fields: (fields: { name: string; maxCount: number }[]) => multerUpload.fields(fields),
};
