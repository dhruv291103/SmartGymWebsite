const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required:true
    },
    lastname : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    gender: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true,
        unique: true
    },
    age : {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    confirmpassword: {
        type:String,
        required:true
    },
    trainer:{
        type:String,
        requied:true
    },
    slot:{
        type:String,
        required:true
    }
})


//collections

const Register = new mongoose.model("Register",employeeSchema);

module.exports = Register;    //making this as public