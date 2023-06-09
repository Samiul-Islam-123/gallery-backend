const DecodeToken = require('./TokenDecoder')
const UserModel = require('../DataBase/DataModels/UserModel')

const verifyUser = async (token)=>{
    //decoding token
    const decodedToken =await DecodeToken(token);
    //fetching user details
    const currentUser = await UserModel.findById(decodedToken.id);
    //check verification
    if(currentUser.verified == true)
    return true;

    else
        return false;
    
};

module.exports = verifyUser;