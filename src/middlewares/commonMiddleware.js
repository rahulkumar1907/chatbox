

const jwt = require("jsonwebtoken");
const blogModel = require("../models/chatModel");



const authentication=  async  function(req,res,next){

  let token = req.headers["x-Api-key"] || req.headers["x-api-key"];
  if (!token) {
    return res.status(400).send({ status: false, msg: "token must be present" });
  }
  let decodedToken = jwt.verify(token, "skyeair",
  async function(err, decodedToken) {
     if (!decodedToken){
         return res.send({ status: false, msg: "token is invalid" });
       }else if(err==null) {
        req["userId"]= decodedToken.userId
                next()
             }
      });
  }
            


const authorisation = async function (req, res, next) {
  let token = req.headers["x-Api-key"] || req.headers["x-api-key"];

 let decodedtoken = jwt.verify(token, "skyeair");
 let userLoggedIn = decodedtoken.userId;

 let userIdFound= await chatModel.findOne({userId : userLoggedIn}).select({_id : 0 , userId:1})
  if (!userIdFound) {
    return res.status(404).send({ status: false, data: "user did not create chat" });
  } // author exist but not created blog. Here we are checking blog Id from author id.
  req["userId"]= decodedtoken.userId
  next();
}


module.exports.authentication = authentication;
module.exports.authorisation = authorisation;



