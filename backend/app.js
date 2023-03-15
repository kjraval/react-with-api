const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Message = require("./models/Message")
require("dotenv").config()
const app = express();


const dbOptions ={
    useNewUrlParser:true,
    autoIndex:false,
    useUnifiedTopology:true
  }
  
  mongoose.connect(process.env.DB,dbOptions)
  mongoose.connection.on("connected",()=>{
   console.log("database connnected")
  
  })
  
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: false }));
  
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(
    cors({
      origin: true,
      methods: "GET,POST,PUT,DELETE,PATCH",
      credentials: true,
    })
  );








app.post("/message", async (req,res)=>{
    const {name,email,message} = req.body;
if(!name || !email || !message) return res.status(401).json({message:"Please provide required fields!"});

const data = new Message({name,email,message})
await data.save();

return res.status(200).json({message:"Your Message has been submitted!"})


})

app.listen(3001,()=>{
    console.log(`server is runnig on port 3001`)
})