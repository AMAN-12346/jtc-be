import multer from 'multer';

import path from 'path';

const fs = require('fs');

export class UploadHandler {
  constructor(fileSize) {
    this.fileSize = fileSize;

    // Memory storage to keep files in memory
    this.storage = multer.memoryStorage();

    this.uploadFile = this.uploadFile.bind(this);
  }

  /**
   * Handle upload errors
   */
  handleUploadError(req, res, next, upload) {
    upload(req, res, function (err) {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            status: 'error',
            message: 'File size limit exceeded',
          });
        }
        return next(err);
      }
      return next();
    });
  }

  /**
   * Upload file using memory storage
   */
  uploadFile(req, res, next) {
    const upload = multer({
      storage: this.storage,
      fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname).toLowerCase();
        console.log('Psssss', ext);
        cb(null, true);
      },
      limits: {
        fileSize: 1024 * 1024 * 100, // Example: 100 MB
      },
    }).any();

    this.handleUploadError(req, res, next, upload);
  }
}

export default new UploadHandler(10);
