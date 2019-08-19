import multer from 'multer';
import { resolve, extname } from 'path';
import { promisify } from 'util';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: async (req, file, cb) => {
      try {
        const res = await promisify(crypto.randomBytes)(16);
        return cb(null, res.toString('hex') + extname(file.originalname));
      } catch (err) {
        return cb(err);
      }
    },
  }),
};
