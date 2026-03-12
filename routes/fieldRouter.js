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
    const timestamp = Date.now();
    const Tracking_Id=name.substring(0,3)+timestamp
      const[inp]=await db.query(`INSERT INTO field(name,email,address,phone,date,Tracking_Id) VALUES(?,?,?,?,?,?)`,[name,email,address,phone,date,Tracking_Id])
    return res.status(200).json({'message':"Field Created Successfully",'color':'blue'})

} catch (error) {
      error.color='red';
    return res.status(403).json(error)
}  
}
 
})


export default router;