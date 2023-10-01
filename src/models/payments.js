const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    cardnumber: {
        type:Number,
        // required:true,
        // unique: true
    },
    name : {
        type:String,
        // required:true
    },
    amount: {
        type:Number,
        // required:true,
        // unique: true
    },
    email : {
        type:String,
        // required:true,
        // unique:true
    },
    expire: {
        type:String,
        // required:true,
        // unique: true
    },
    cvv: {
        type:Number,
        // required:true,
        // unique: true
    },
    time:{
        type:String,
        // required:true,
        // unique: true
    },
    validity:{
        type:String,
         // required:true,
        // unique: true
    }
})


//collections

const Payment = new mongoose.model("Payment",paymentSchema);

module.exports = Payment;    //making this as public