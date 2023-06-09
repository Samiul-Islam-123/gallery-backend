const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const uploadDestination = path.join(__dirname, 'uploads');
const bodyParser = require('body-parser');

//custom files
const Connect = require('./DataBase/Connection')
const UploadRoute = require('./Routes/AppFunctions/Upload')
const Signup = require('./Routes/Authnetication/Signup')
const VerificationRoutee = require("./Routes/Authnetication/Verification");
const LoginRouter = require('./Routes/Authnetication/Login')
const UserVerfication = require('./Utils/UserVerification')
const fetchRoute = require('./Routes/AppFunctions/Fetch')

//creating express app
const app = express();
//configuring environment variable
dotenv.config();

app.use('/uploads', express.static(uploadDestination));
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(cors());

//handling routes
app.get('/', (req,res)=>{
    res.send('Server is running absolutely fine.');
})

//authentication routes
app.use("/authentication/", Signup);
app.use("/authentication/", VerificationRoutee);
app.use("/authentication/", LoginRouter);

app.use('/app', UploadRoute);
app.post('/userVerification',async(req,res)=>{

    if(!req.body.token)
    res.send('token not found')

    else{
        if(await UserVerfication(req.body.token))
        res.sendStatus(200);
        
        else
        res.send('not verified')
    }


})
app.use('/app', fetchRoute)

//starting server
const PORT = process.env.PORT;
app.listen(PORT,async()=>{
    console.log("Server is starting...")
    await Connect();
    console.log("Server is up and running on PORT : "+PORT)
})