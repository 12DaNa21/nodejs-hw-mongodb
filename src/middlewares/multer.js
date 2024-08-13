import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('Saving file to TEMP_UPLOAD_DIR');
      cb(null, TEMP_UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      console.log('Generated filename:', `${uniqueSuffix}_${file.originalname}`);
      cb(null, `${uniqueSuffix}_${file.originalname}`);
    },
  });

  export const upload = multer({ storage });
