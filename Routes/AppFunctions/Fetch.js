const FileModel = require("../../DataBase/DataModels/FileModel");
const DecodeToken = require("../../Utils/TokenDecoder");

const fetchRoute = require("express").Router();

fetchRoute.post("/fetch-all", async (req, res) => {
  //decode token
  const decodedToken = await DecodeToken(req.body.token);
  //fetch all files
  const Files = await FileModel.find({
    owner: decodedToken.id,
  });
  //sending files
  res.send(Files);
});

fetchRoute.post("/fetch-images", async (req, res) => {
  //decode token
  const finalData = [];
  const decodedToken = await DecodeToken(req.body.token);
  //fetch all files
  const Files = await FileModel.find({
    owner: decodedToken.id,
  });
  //filtering files
  const imgIndicator = {
    jpg: ".jpg",
    png: ".png",
    tiff: ".tiff",
    jfif: ".jfif",
    bmp: ".bmp",
    gif: ".gif",
    svg: ".svg",
    webp: ".webp",
    jpeg: ".jpeg",
    svgz: ".svgz",
    ico: ".ico",
  };
  Files.map((item) => {
    for(ele in imgIndicator){
        if(item.fileName.split('.')[1] == ele)
        {
            finalData.push(item)
        }
    }
  });

  res.send(finalData)
});

fetchRoute.post("/fetch-docs", async (req, res) => {
    //decode token
    const finalData = [];
    const decodedToken = await DecodeToken(req.body.token);
    //fetch all files
    const Files = await FileModel.find({
      owner: decodedToken.id,
    });
    //filtering files
    const docIndicator = {
      pdf : ".pdf",
      doc : ".doc",
      docx : ".docx",
      xls : ".xls",
      xlsx : ".xlsx"
    };
    Files.map((item) => {
      for(ele in docIndicator){
          if(item.fileName.split('.')[1] == ele)
          {
              finalData.push(item)
          }
      }
    });
  
    res.send(finalData)
  });

  fetchRoute.post("/fetch-videos", async (req, res) => {
    //decode token
    const finalData = [];
    const decodedToken = await DecodeToken(req.body.token);
    //fetch all files
    const Files = await FileModel.find({
      owner: decodedToken.id,
    });
    //filtering files
    const videoIndicator = {
      ogm : ".ogm",
      wmv : ".wmv",
      mpg : ".mpg",
      webm : ".webm",
      ogv : ".ogv",
      mov : ".mov",
      asx : ".asx",
      mpeg : ".mpeg",
      mp4 : ".mp4",
      m4v : ".m4v",
      avi :".avi" 
    };
    Files.map((item) => {
      for(ele in videoIndicator){
          if(item.fileName.split('.')[1] == ele)
          {
              finalData.push(item)
          }
      }
    });
  
    res.send(finalData)
  });


module.exports = fetchRoute;
