const util = require("util");
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const connectionString = process.env.ATLAS_URI;
const imagePath = process.env.IMAGE_PATH;
var storage = new GridFsStorage({
    url:`${connectionString}/${imagePath}`,
    options:{useNewUrlParser:true,useUnifiedTopology:true},
    file:(req,file)=>{
       
        const match = ["image/png","image/jpeg"];
        if(match.indexOf(file.mimetype)!=-1){
            return {
                bucketName:`${imagePath}`,
            }
        }
    }
});
var uploadFiles = multer({storage:storage}).array("file",9);

// var uploadFiles = multer({storage:storage}).single("file");
var uploadFileMiddleWare = util.promisify(uploadFiles);
module.exports = uploadFileMiddleWare;