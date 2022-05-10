const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'images/jpg' || file.mimetype === 'images/jpeg' || file.mimetype === 'images/png')
        return cb(new Error('You can upload only image'), false);
    else
        return cb(null, true);
};

const upload = multer({storage: storage, fileFilter: fileFilter});

module.exports = upload;