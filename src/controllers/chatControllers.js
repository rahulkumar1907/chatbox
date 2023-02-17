const userModel = require("../models/userModel");
const chatModel = require("../models/chatModel");
const messageModel = require("../models/messageModel");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const createChat = async function (req, res){
try{
  let userId=req.body.users
  let loginUserId=req["userId"]
  const usersDetails=await userModel.findOne({_id:userId}).populate()
  if(!usersDetails){return res.status(404).send({ status: false, Error: "user not found." });}
  const messageDetails=await messageModel.find({_id:req.body.message}).populate()
  // console.log("data",messageDetails[0])
  let messageDetail={
    content:messageDetails[0].content,
    chat:messageDetails[0].chat,
    sender:messageDetails[0].sender,
  }
  
  
  const chatData = {
    users: userId,
    chatName: req.body.chatName,
    logInUserId:loginUserId,
    message: messageDetail,
    messageId: req.body.message,
  }
  // console.log(chatData);
  let dataCreated = await chatModel.create(chatData);
   return res.status(201).send({ data: dataCreated });

}catch(err){
  res
      .status(500)
      .send({
        status: false,
        Error: "Server not responding",
        error: err.message,
      });
}
}


// create message
const createMessage = async function (req, res){
  try{
    // let userId=req.body.users
    let loginUserId=req["userId"]
  
    const messageData = {
      content: req.body.content,
      sender: loginUserId,
      chat:req.body.chatId,
      message: req.body.message,
    }
    // console.log(chatData);
    let dataCreated = await messageModel.create(messageData);
     return res.status(201).send({ data: dataCreated });
  
  }catch(err){
    res
        .status(500)
        .send({
          status: false,
          Error: "Server not responding",
          error: err.message,
        });
  }
  }
//------------------------------------------------------------------------------------------//





//------------------------------------------------------------------------------------------//

module.exports.createChat = createChat;
module.exports.createMessage = createMessage;






































































































 // let token = req.headers["x-Api-key"] || req.headers["x-api-key"];
  // let decodedtoken = jwt.verify(token, "project1-uranium");
  // let authorLoggedIn = decodedtoken.authorId;






// const updateBlog = async function (req, res) {
//   try {
//     let token = req.headers["x-Api-key"] || req.headers["x-api-key"];
//     let decodedtoken = jwt.verify(token, "project1-uranium");
//     let authorLoggedIn = decodedtoken.authorId;
//     console.log(authorLoggedIn)
//     //let authorLoggedIn = req["authorId"]

//     let blogId = req.params.blogId;
//     let Body = req.body;
//     const { title, body, tags, subCategory } = Body;


//     const isValidObjectId = function(objectId) {
//       return mongoose.Types.ObjectId.isValid(objectId)
//       }
//       console.log(isValidObjectId(blogId))
//       if(isValidObjectId(blogId)== false){
//         res.status(400).send({ msg: "Please Provide valid Blog Id." });
//       }else{
//       let blog = await blogModel
//       .findOne({ _id: blogId })
//       .select({ _id: 0, authorId: 1 });

//     if (blog == null) {
//       res.status(404).send({ status: false, msg: "Blog does not exist." }); //blog Id does not exist becouse id is not from blog collection. Here we are checking blog id from path param.
//     } else if (authorLoggedIn == blog.authorId) {
//       console.log(blog.authorId);
//       console.log(authorLoggedIn);

//       const updateBlogs = await blogModel
//         .findOneAndUpdate(
//           { _id: blogId },
//           {
//             title: title,
//             body: body,
//             $addToSet: { tags: tags, subCategory: subCategory },
//             ispublished: true,
//           },
//           { new: true }
//         )
//         .populate("authorId");
//       res.status(200).send({ status: true, date: updateBlogs });
//     } else {
//       res.status(401).send({ status: false, msg: "Not authorised" });
//     }
//    }
// } catch (err) {
//     res
//       .status(500)
//       .send({
//         status: false,
//         msg: "Server not responding",
//         error: err.message,
//       });
//   }
// };


// let token = req.headers["x-Api-key"] || req.headers["x-api-key"];
    // let decodedtoken = jwt.verify(token, "project1-uranium");
    // let authorLoggedIn = decodedtoken.authorId;








// const getBlog = async function (req, res) {
//   try {
//     let Category = req.query.category;
//     let SubCategory = req.query.subCategory;
//     let Id = req.query.authorId;
//     let Tags = req.query.tags;

//     let division = await blogModel.find({
//       $or: [
//         { authorId: Id },
//         { category: Category },
//         { subCategory: SubCategory },
//         { tags: Tags },
//       ],
//     });

//     if (division.length != 0) {
//       let data = division.filter(
//         (x) => x.ispublished === true && x.isDeleted === false
//       );

//       if (data) {
//         res.status(200).send({ status: true, msg: data });
//       } else {
//         res.status(404).send({ status: false, msg: "Blog does not exist!" });
//       }
//     } else {
//       let blog = await blogModel
//         .find({ ispublished: true, isDeleted: false })
//         .populate(authorId);
//       // console.log(blog)
//       res.status(200).send({ status: true, msg: blog });
//     }
//   } catch (err) {
//     res
//       .status(500)
//       .send({
//         status: false,
//         msg: "Server not responding",
//         error: err.message,
//       });
//   }
// };