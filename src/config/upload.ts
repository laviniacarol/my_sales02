import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import fs from 'fs';

interface IUploadConfig {
  driver: 'disk';
  directory: string;
  storage: StorageEngine;
}

const uploadFolder = path.resolve(process.cwd(), 'uploads');

// Criar a pasta se não existir
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

console.log('Upload folder:', uploadFolder);

const uploadConfig: IUploadConfig = {
  driver: 'disk',
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      console.log('Saving file:', fileName);
      callback(null, fileName);
    },
  }),
};

export default uploadConfig;
