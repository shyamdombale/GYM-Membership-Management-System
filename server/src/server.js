require("dotenv").config();const express=require("express"),cors=require("cors"),cron=require("node-cron"),db=require("./config/db");
const app=express();app.use(cors());app.use(express.json());
["auth","members","classes","bookings","progress","analytics","attendance","plans","lockers","payments"].forEach(x=>app.use("/api/"+x,require("./routes/"+x)));
app.get("/api/health",(q,s)=>s.json({ok:true,name:"IronGrid API"}));
cron.schedule("0 9 * * *",async()=>{try{await db.query(`INSERT INTO notifications(member_user_id,message,type) SELECT user_id,CONCAT('Membership renews on ',renews),'renewal' FROM members WHERE renews BETWEEN CURDATE() AND DATE_ADD(CURDATE(),INTERVAL 7 DAY)`)}catch(e){console.error("renewal cron",e.message)}});
app.use((e,q,s,n)=>{console.error(e);s.status(500).json({message:"Server error"})});
app.listen(process.env.PORT||5000,()=>console.log("IronGrid API running"));
