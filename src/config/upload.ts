import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

interface IUploadConfig {
  driver: 'disk';
  directory: string;
  storage: StorageEngine;
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

const uploadConfig: IUploadConfig = {
  driver: 'disk',
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
};

export default uploadConfig;
