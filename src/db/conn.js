const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/gymRegistration",{
    //useNewParser:true,
    useUnifiedTopology:true,
    //useCreateIndex:true
}).then(()=>{
    console.log('connection successfull');
}).catch((e)=>{
    console.log(`error ${e}`);
})