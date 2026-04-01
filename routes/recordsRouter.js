import express from 'express'
import db from "../db.js";
import { AuthMiddleware } from '../Middleware/AuthMiddleware.js';
const router=express.Router()



router.post('/create',AuthMiddleware,async(req,res)=>{
    const body=req.body
    console.log(body)
    const error={location:"",parameter:"",quantity:"",breadth:"",width:""}
    const {fieldId,TrackingId,location,parameter,quantity,breadth,width,etc,userId}=body;

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
const agent_id = req.userData.agentId;
const record_Id= agent_id+location.substring(0,3)+rh;

try {
const query=`INSERT INTO records(userId,fieldId,Tracking_Id,agentId,record_Id,location,parameter,parameterId,price,quantity,width,breadth) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`
const[rt]=await db.query(query,[userId,fieldId,TrackingId,agent_id,record_Id,location,parameter,etc['id'],etc['price'],quantity,width,breadth])
return res.status(200).json({'message':"Record Created Successfully",'color':'blue'})
} catch (error) {
    console.log(error)
       return res.status(500).json({'message':"Something Went Wrong ",'color':'red',error})
}
}
})



router.get("/edit",AuthMiddleware, async (req,res) => {
    const {id}=req.query;
try {

    const query=`SELECT * FROM records WHERE id=? LIMIT 1`;
    const[quest]=await db.query(query,[id]);
     const [parameter]=await db.query(`SELECT name,price,parameterId FROM parameters WHERE userId=?`,[quest[0]['userId']])
 
     return res.status(200).json({quest,parameter})
    
} catch (error) {
    console.log(error)
       return res.status(500).json({'message':"Something Went Wrong ",'color':'red',error})
}
})

router.post("/update",AuthMiddleware, async(req,res) => {
    const body=req.body
    console.log(body)
    const error={location:"",parameter:"",quantity:"",breadth:"",width:""}
    const {location,parameter,quantity,breadth,width,parameterId,price,record_Id}=body;

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
try {
    const query=`UPDATE records SET location=?, parameter=?,quantity=?, breadth=?, width=?,parameterId=?,price=? WHERE record_Id=?`;
    const [qr]=await db.query(query,[location,parameter,quantity,breadth,width,parameterId,price,record_Id]);
    return res.status(200).json({'message':"Record Created Successfully",'color':'blue'})
} catch (error) {
    console.log(error)
       return res.status(500).json({'message':"Something Went Wrong ",'color':'red',error})
}
}

})

router.get("/delete",AuthMiddleware, async (req,res) => {
    const {id}=req.query;
     
    try {
        const [del]=await db.query(`DELETE FROM records WHERE id=?`,[id]);
   return res.status(200).json({'message':"Record Deleted Successfully",'color':'blue'})
    
} catch (error) {
    console.log(error)
       return res.status(500).json({'message':"Something Went Wrong ",'color':'red',error})
}

   
})


//Select All Records for Admin

router.get("/getAdminRec",AuthMiddleware,async (req,res) => {
    const {id}=req.query;
    const user_id=req.userData.id;
    try {
        const[query]=await db.query(`SELECT * FROM records WHERE Tracking_Id=?`,[id]);
      if (query.length!==0) {
         const fieldId= query.map((e)=>{return e.fieldId})
          const agentId= query.map((e)=>{return e.agentId})
          const[field]=await db.query(`SELECT * FROM field WHERE id IN(?)`,[fieldId]);
          const[agent]=await db.query(`SELECT * FROM agents WHERE agentId IN(?)`,[agentId]);
          return res.status(200).json({records:query,field:field,agent:agent})    
      }
        return res.status(200).json({records:[],field:[],agent:[]})    
    } catch (error) {
        console.log(error)
         return res.status(500).json({message:"Something Went Wrong"})  
    }

})


export default router;