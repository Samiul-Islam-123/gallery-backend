const FileModel = require('../../DataBase/DataModels/FileModel');
const DecodeToken = require('../../Utils/TokenDecoder');

const fetchRoute = require('express').Router();

fetchRoute.post('/fetch-all',async(req,res)=>{
    //decode token
    const decodedToken =await DecodeToken(req.body.token);
    //fetch all files
    const Files = await FileModel.find({
        owner : decodedToken.id
    })
    //sending files
    res.send(Files)
})

module.exports = fetchRoute;