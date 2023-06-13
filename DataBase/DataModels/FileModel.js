const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    fileName : {
        type : String,
        required : true
    },
    fileSize : {
        type : Number,
        require : true
    },
    fileURL : {
        type : String,
        required : true
    },
    uploadDate : {
        type : String,
        required : true
    },
    owner : {
        type : String,
        required : true
    }
})

const FileModel = new mongoose.model('File', FileSchema);
module.exports = FileModel