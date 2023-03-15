const mongoose = require('mongoose')
const Message = mongoose.Schema({
    
    email:String,
    name:String,
    message:String  
})

module.exports = mongoose.model("message", Message)