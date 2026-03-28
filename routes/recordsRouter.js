import express from 'express'
import db from "../db.js";
import { AuthMiddleware } from '../Middleware/AuthMiddleware.js';
const router=express.Router()



router.post('/create',AuthMiddleware,async(req,res)=>{
    const body=req.body
    console.log(body)
    const error={location:"",parameter:"",quantity:"",breadth:"",width:"",}
    const {fieldId,TrackingId,location,parameter,quantity,breadth,width,etc}=body;

      const alphabetLowercase = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(i + 97)
);

const numbers = Array.from({ length: 10 }, (_, i) => i);

const alphanumeric = [...alphabetLowercase, ...numbers];

Object.keys(body).forEach((e)=>{
    if (!body[e] ||  body[e].length ==0) {
        error[e]= `The ${e} Is Required`
    }
})

 const hasError = Object.values(error).some((v) => v !== "");
 if (hasError) {
    error.type="empty"
    console.log(error)
    return res.status(400).json(error)
}else{
    const tg=[];

for (let i = 0; i < 4; i++) {
    let rnd=Math.ceil(Math.random()*(alphanumeric.length -1))
   tg.push(alphanumeric[rnd]);
    
}
const rh=tg.join('');
const agent_id = req.userData.id;
const record_Id= agent_id+location.substring(0,3)+rh;

try {
const query=`INSERT INTO records(fieldId,Tracking_Id,agentId,record_Id,location,parameter,parameterId,price,quantity,width,breadth) VALUES(?,?,?,?,?,?,?,?,?,?,?)`
const[rt]=await db.query(query,[fieldId,TrackingId,agent_id,record_Id,location,parameter,etc['id'],etc['price'],quantity,width,breadth])
return res.status(200).json({'message':"Record Created Successfully",'color':'blue'})
} catch (error) {
    console.log(error)
       return res.status(500).json({'message':"Something Went Wrong ",'color':'red',error})
}
}
})


export default router;