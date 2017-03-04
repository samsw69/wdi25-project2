
///is this required at all if S3 not being used?
//should S3 be used for storing several small images eg profile or activity pics?


// // const s3 = require('./s3');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const uuid = require('uuid');
//
// module.exports = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     key(req, file, next) {
//       const ext = file.mimetype.replace('image/', '');
//       next(null, `${uuid.v4()}.${ext}`);
//     },
//     contentType: multerS3.AUTO_CONTENT_TYPE
//   })
// });
