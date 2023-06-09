const UploadRoute = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const FileModel = require("./../../DataBase/DataModels/FileModel");
const DecodeToken = require("./../../Utils/TokenDecoder");

const upload = multer({
  limits: {
    fileSize: 700 * 1024 * 1024, // 700MB (in bytes)
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      const extention = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + Date.now() + extention);
    },
  }),
});

UploadRoute.post("/upload-single", upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.send("file not found");
  }

  const link = `http://localhost:5500/uploads/${file.filename}`;

  const decodedToken = await DecodeToken(req.body.token);
  const metadata = {
    fileName: file.filename,
    fileURL: link,
    uploadDate: new Date(Date.now()).toLocaleString(),
    owner: decodedToken.id,
  };

  const currentFile = new FileModel(metadata);
  await currentFile.save();

  res.send(link);
});

UploadRoute.post(
  "/upload-multiple",
  upload.array("files"),
  async (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    console.log(files);

    res.status(200).send("Files uploaded successfully.");
  }
);

module.exports = UploadRoute;
