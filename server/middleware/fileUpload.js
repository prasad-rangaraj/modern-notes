const multer = require('multer');
const path =  require('path');


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads/');
    },
    filename: (req,file,cb) => {
        const ext = path.extname(file.originalname);
        cb(null,`${Date.now()}${ext}`); 
    }
});

const upload = multer({
    storage,
    fileFilter: (req,file,cb) => {
        const fileName = /jpeg|jpg|png/;
        const extName = fileName.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileName.test(file.mimetype);
        if(extName && mimetype){
            return cb(null,true);
        }
        cb(new Error("only images(jpeg,jpg,png) are allowed"));
    },
    limits: { fieldSize: 5 * 1024 * 1024 }
});

module.exports = upload;