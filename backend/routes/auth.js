const router = require("express").Router();
const User = require("../models/User");

router.post("/login", async (req,res)=>{

 const {username, role} = req.body;

 let user = await User.findOne({username});

 if(!user){
   user = await User.create({username, role});
 }

 res.json(user);
});

module.exports = router;