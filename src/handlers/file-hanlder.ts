const multer = require('multer');
const path = require('path');

const storageEngine = multer.diskStorage({
  //@ts-ignore
    destination: (req, file, cb) => {
        if (file.fieldname === 'image' || file.fieldname === 'images')
            cb(null, './storage/images');
        else
            cb(null, false);
    },
    //@ts-ignore
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        console.log(file);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storageEngine });

// module.exports = upload;    
export default upload