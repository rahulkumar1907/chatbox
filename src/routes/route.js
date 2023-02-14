const express = require('express');
const router = express.Router();
const userController = require("../controllers/userControllers")
const chatController = require("../controllers/chatControllers")
const middleWare = require("../middlewares/commonMiddleware")

router.post("/create_user",userController.createUser)
router.post("/create_chat",middleWare.authentication,chatController.createChat)
router.post("/create_message",middleWare.authentication,chatController.createMessage)

// router.get("/blogs",middleWare.authentication,blogController.getBlog)

// router.put("/blogs/:blogId",middleWare.authentication,middleWare.authorisation,blogController.updateBlog)

// router.delete("/blogs/:blogId",middleWare.authentication,middleWare.authorisation,blogController.deleteBlog)
// router.delete("/blogs",middleWare.authentication,middleWare.authorisation,blogController.deleteBlog1)

router.post("/login", userController.loginUser)
router.get("/get_users", userController.getUser)


module.exports = router;
