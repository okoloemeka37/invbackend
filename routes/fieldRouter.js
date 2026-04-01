import express from "express";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.js";
import db from "../db.js";

const router=express.Router();

router.post("/create",AuthMiddleware,async(req,res)=>{
    const bod=req.body
    const error={name:'',email:'',address:'',phone:'',date:''}
const{name,email,address,phone,date}=bod;

Object.keys(bod).forEach(v => {
    if (bod[v].length ===0) {
        error[v]=`The ${v} is required`
    }
});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    error.email = "Invalid email";
  }

  const phoneRegex = /^[0-9]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    error.phone = "Invalid phone number";
  }

  const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dobRegex.test(date) || isNaN(new Date(date))) {
    error.date = "Invalid date of birth";
  }
  const hasError = Object.values(error).some((v) => v !== "");
 if (hasError) {
    error.color='red';
    return res.status(403).json(error)
}else{
try {
      const user_id = req.userData.id;
    const timestamp = Date.now();
    const Tracking_Id=name.substring(0,3)+timestamp
      const[inp]=await db.query(`INSERT INTO field(user_id,name,email,address,phone,date,Tracking_Id) VALUES(?,?,?,?,?,?,?)`,[user_id,name,email,address,phone,date,Tracking_Id])
    return res.status(200).json({'message':"Field Created Successfully",'color':'blue'})

} catch (error) {
      error.color='red';
    return res.status(403).json(error)
}  
}
 
})

router.get("/get",AuthMiddleware,async(req,res)=>{
    const user_id = req.userData.id;
    const [get]=await db.query(`SELECT * FROM field WHERE user_id=?`,[user_id]);
    return res.status(200).json(get)
})

router.get("/getSingF",AuthMiddleware, async (req,res)=>{
   const user_id = req.userData.id;
  const {id}=req.query
  const query=``;
  const[field]=await db.query(`SELECT field.*,GROUP_CONCAT(ftoa.agentId) AS agents FROM field LEFT JOIN ftoa ON field.id = ftoa.fieldId WHERE field.id = ? GROUP BY field.id;`,[id]);
  const [agents]=await db.query(`SELECT name, agentId FROM agents WHERE userId=?`,[user_id]);
  //const [agt]= await db.query(`SELECT * FROM fToA WHERE id=?`,[id]);
   return res.status(200).json({field,agents})
})


router.post("/setAgent",AuthMiddleware, async(req,res)=>{
  const {agentId,fieldId}=req.body;
   const user_id = req.userData.id;

   try {
     const [p]=await db.query(`INSERT INTO ftoa(userId,agentId,fieldId) VALUES(?,?,?)`,[user_id,agentId,fieldId]);
    return res.status(200).json({'message':"Agent Added to Field Successfully",'color':'blue'})

  } catch (error) {
    console.log(error)
    //return res.status(error.status).json(error);
  } 
})

router.post("/removeAgent",AuthMiddleware, async(req,res)=>{
  const {agentId,fieldId}=req.body;

   try {
     const [p]=await db.query(`DELETE FROM ftoa WHERE agentId=? AND fieldId=?`,[agentId,fieldId]);
    return res.status(200).json({'message':"Agent Remove From Field Successfully",'color':'blue'})

  } catch (error) {
    console.log(error)
    //return res.status(error.status).json(error);
  } 
})




////Admin Subview Invoice ID

router.get("/AdminSubInv",AuthMiddleware, async (req,res) => {
  const user_id=req.userData.id;
  
try {
    const[adm]=await db.query(`SELECT Tracking_Id, COUNT(agentId) total_agent, COUNT(record_Id) AS total_records FROM records  WHERE userId = ? GROUP BY Tracking_Id;`,[user_id])
console.log(adm)
    return res.status(200).json(adm)
} catch (error) {
  console.log(error)
  return res.status(500).json({message:"Something Went Wrong"})
}
})

export default router;