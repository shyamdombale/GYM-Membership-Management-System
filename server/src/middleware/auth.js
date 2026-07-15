const jwt=require("jsonwebtoken");
exports.auth=(req,res,next)=>{const t=req.headers.authorization?.split(" ")[1];if(!t)return res.status(401).json({message:"Login required"});try{req.user=jwt.verify(t,process.env.JWT_SECRET);next()}catch{return res.status(401).json({message:"Invalid token"})}};
exports.roles=(...r)=>(req,res,next)=>r.includes(req.user.role)?next():res.status(403).json({message:"Forbidden"});
