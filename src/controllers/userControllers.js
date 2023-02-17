const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
let saltRounds = 10

const createUser = async function (req, res) {
  try {
    
    let title = req.body.title
    let name = /^[a-zA-Z ]{2,30}$/.test(req.body.firstname);
    let last = /^[a-zA-Z ]{2,30}$/.test(req.body.lastname);
    let emailId = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(req.body.email);
    let password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(req.body.password);

    let user = await userModel.findOne({ email: req.body.email });
    if (req.body.firstname === undefined || req.body.lastname === undefined || req.body.email === undefined || req.body.password === undefined ||req.body.phone === undefined) {
      res.status(400).send({ msg: "Invalid request ! Please provide details" })
    }

    else if (!req.body.firstname) {
      res.status(400).send({ Error: "Firstname missing" })
    }
    else if (!req.body.lastname) {
      res.status(400).send({ Error: "Lastname missing" })
    }
    // enum key value check
    else if (!["Mr", "Mrs", "Miss"].includes(title)) {
      return res.status(400).send({
        status: false,
        Error: "Title Must be of these values [Mr, Mrs, Miss] ",
      });
    }


    else if (!req.body.email) {
      res.status(400).send({ Error: "Email Id missing" })
    }
    else if (!req.body.password) {
      res.status(400).send({ Error: "Password missing" })

    }
    else if (name == false) {
      res.status(400).send({ Error: "Please Enter valid name." });
    }

    else if (last == false) {
      res.status(400).send({ Error: "Please Enter valid lastname." });
    }

    else if (emailId == false) {
      res.status(400).send({ Error: "Please Enter valid email." });
    }
    
    else if (password == false) {
      res.status(400).send({
        Error: "Password should include atleast one special character, one uppercase, one lowercase, one number and should be mimimum 8 character long",
      });
    }
    else if (!user) {
      const encryptPassword = await bcrypt.hash(req.body.password, saltRounds)
      const userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone:req.body.phone,
        password: encryptPassword,
        title:req.body.title
      }
      
      let dataCreated = await userModel.create(userData);
      res.status(201).send({ data: dataCreated });
    }
    else if (user) {
      res.status(409).send({ Error: "This email or phone already exist" })
    }
  } catch (err) {
    res.status(500).send({ Error: "Server not responding", error: err.message });
  }
}




const loginUser = async function (req, res) {

  try{
  let email1 = req.body.email;
  let password1 = req.body.password;

  if (!email1) {
    res
      .status(400)
      .send({ status: false, Error: "Please enter an email address." });
  } else if (!password1) {
    res.status(400).send({ status: false, Error: "Please enter Password." });
  } else {
    let user = await userModel.findOne({
      email: email1
    });
    // console.log("user",user)
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
    // console.log("error",isPasswordMatch)
    if (!isPasswordMatch) return res.status(401).send({ status: false, message: "Password is Incorrect" })
    if (!user)
      return res.status(400).send({
        status: false,
        Error: "Email or the Password is incorrect.",
      });

    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "skyeair",
        organisation: "skyeair",
      },
      "skyeair",
      { expiresIn: "24h" }
    );
    res.setHeader("x-api-key", token);
    res.status(200).send({ status: true,message:"login succefully", data: token });
  }
}catch (err) {
    res.status(500).send({ Error: "Server not responding", error: err.message });
  }
};



const getUser = async function (req, res) {
// get all user except who is log in
  try{
    const keyToSearch=req.query.email
   
    const users=await userModel.findOne({email:keyToSearch})
    let userIdFound=users._id
    const allUsers=await userModel.find({_id:{$ne:userIdFound}})
   return res.status(200).send({ status: true,message:"all users details", data: allUsers });

  
  }
catch (err) {
    res.status(500).send({ Error: "Server not responding", error: err.message });
  }
};




module.exports = { createUser, loginUser,getUser }
















