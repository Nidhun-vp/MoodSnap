const router = require("express").Router();
const Mood = require("../models/Mood");

router.post("/", async(req,res)=>{
 const data = await Mood.create(req.body);
 res.json(data);
});

router.get("/", async(req,res)=>{

 const {role,userId} = req.query;

 let moods;

 if(role==="admin"){
   moods = await Mood.find().sort({createdAt:-1});
 }else{
   moods = await Mood.find({userId}).sort({createdAt:-1}).limit(10);
 }

 res.json(moods);
});

router.delete("/:id", async(req,res)=>{

 if(req.query.role !== "admin"){
   return res.status(403).json({msg:"Access denied"});
 }

 await Mood.findByIdAndDelete(req.params.id);
 res.json({msg:"Deleted"});
});

router.get("/stats/all", async(req,res)=>{

 const {role,userId} = req.query;

 let match = {};

 if(role==="user"){
   match.userId = userId;
 }

 const stats = await Mood.aggregate([
   {$match:match},
   {$group:{_id:"$mood", count:{$sum:1}}}
 ]);

 res.json(stats);
});

module.exports = router;