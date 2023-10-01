const { Router } = require("express");
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");
const Payment = require("./models/payments");
// const { Console } = require("console1");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials");

// let morningSlot = 5;
// let eveningSlot = 5;



app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/", (req,res) => {
    res.render("index2")   // login
    
})

app.get("/facilities",(req,res)=>{
    res.render("facilities");
})

app.get("/login", (req,res) => {
    res.render("login");
})
app.get("/register", (req,res) => {
    res.render("register");
})
app.get("/contactUs", (req,res) => {
    res.render("contactUS");
})
app.get("/aboutus", (req,res) => {
    res.render("aboutus");
})
app.get("/payment", (req,res) => {
    res.render("payment");
})
app.get("/mydetails",(req,res) => {
    res.render("mydetails");
})



// app.post("/register",async(req,res)=> {

//     const data= { 
//         name:req.body.name,
//         lastName:req.body.lastName,
//         password:req.body.password,
//         confirmPassword:req.body.confirmPassword
        
//     }
// })

//creating new user in database
app.post("/register",async (req,res) => {
    try {
        // console.log(req.body.trainer);
        // res.send(req.body.email);
         const password = req.body.password
         const cpassword = req.body.confirmpassword
         

         if(password === cpassword){
                const registerEmployee = new Register({
                        firstname:req.body.firstname,
                        lastname:req.body.lastname,
                        gender:req.body.gender,
                        email:req.body.email,
                        phone:req.body.phone,
                        age:req.body.age,
                        password:password,
                        confirmpassword:cpassword,
                        trainer:req.body.trainer,
                        slot:req.body.slot
                })
                const registered = await registerEmployee.save();
                res.status(201).render("registered");
         }
         else{
            res.send("Username and Password didn't match !");
         }


    } catch(error) {
        // res.status(400).send(error);
        res.send(error);
    }
    // if(eveningSlot==slot)
    //     {eveningSlot=eveningSlot-1;}
    // if(morningSlot==slot)
    //     {morningSlot=morningSlot-1;}
})

app.post("/payment",async (req,res) => {
    try {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let validity_data = `${day}-${month+3}-${year}`;
        let currentDate = `${day}-${month}-${year}`;

        console.log(currentDate);
        console.log(req.body.email);
        var userdata= await Register.findOne({email:req.body.email});
        // const email=userID.
        console.log(userdata);
         if(userdata.email == req.body.email){
                const paymentproc = new Payment({
                    cardnumber:req.body.cardnumber,
                    name:req.body.name,
                    amount:req.body.amount,
                    email:req.body.email,
                    expire:req.body.expire,
                    cvv:req.body.cvv,
                    time:currentDate,
                    validity:validity_data
                        // password:password,
                        // confirmpassword:cpassword,
                        // trainer:req.body.trainer,
                        // slot:req.body.slot
                })
                const payment = await paymentproc.save();
                // res.send(" Payment Successfull!!!!");
                // alert('Payment Successfull !');
                res.status(201).render("paymentsuccess");
         }
         else{
            res.send("Username and Password didn't match !");
         }


    } catch(error) {
        // res.status(400).send(error);
        res.send(error);
    }
    
})

// login check 
app.post("/login",async(req,res)=> {
    try{

        const email= req.body.email;
        const password = req.body.password;
 
        var userdata= await Register.findOne({email:email});
        userID = userdata;

        subdetail = await Payment.findOne({email:email});

        // console.log("start");
        // // console.log(userID);
        // console.log("end");
        // const detialperticularuser= await Register.findOne({email:email});
        if(userdata.password === password){
           
            res.status(201).render("mydetails",{sampleData: userdata , subdetails:subdetail});
            // console.log(myDetails.name)
            //  console.log(userdata);
            //  fname = userdata.firstname;
            //  const firname = document.querySelector('#finame').innerHTML(fname);
            //  console.log(fname);
        }else{
            res.send("password is not matching");
        }



    }catch(error){
        res.status(400).send("invalid login details")
    }
})


app.post("/slotchange",async(req,res)=> {

    try{
        const slotsel= req.body.slot;
        console.log(slotsel);
        console.log("this i stest");
        // console.log((userID.email));
        // userID.slot=slotsel;
        // Get all users
    // const allUsers = await Register.find();

    // console.log(allUsers); // log all users to the console
        
        // const email= req.body.email;
 
        // const userdata= await Register.findOne({email:email});
        const filter = { email: userID.email}; // filter for the user to update

        // if (morningSlot === 0) {
        //     alert("morningslot is 0!");
        //   }
        // else if(eveningSlot === 0) {
        //     alert("morningslot is 0!");
        //   }
        // else{
            const update = {slot: slotsel}; // new email value
        // }
        const result = await Register.updateOne(filter, update);

        const userdata1= await Register.findOne({email: userID.email});
       
        
        // console.log(morning);
 
        // const userdata= await Register.findOne({email:email});
        // const detialperticularuser= await Register.findOne({email:email});
        // const registered = await registerEmployee.save();
        // const registered = await registerEmployee.save();
        console.log(userdata1);
        res.status(201).render("mydetails",{sampleData: userdata1,  subdetails:subdetail});
        
    }
    // else{
    //         res.send("password is not matching");
    //     }
    


    catch(error){
        res.status(400).send("invalid login details")
    }
})

app.get('/all-details',(req,res) =>{
    Register.find({})
    .then((result)=>{
        res.render("userdetails",{result})
        console.log(result);
    }).catch((err)=>{
        console.log(err);
    })
})

app.listen(port, () => {
    console.log(`serving is running at port number ${port}`);
})