import express from 'express'
import db from "../db.js";
import bcrypt from "bcryptjs";
import { AuthMiddleware } from '../Middleware/AuthMiddleware.js';

const router=express.Router()

router.post("/create",AuthMiddleware,async(req,res)=>{
    
    const alphabetLowercase = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(i + 97)
);

const numbers = Array.from({ length: 10 }, (_, i) => i);

const alphanumeric = [...alphabetLowercase, ...numbers];


    const error = { name: "", passcode: "" };
    const { name, passcode } = req.body;

    // validation
    if (!name || name.length === 0) {
        error.name = "The name field is required";
    }

    if (!passcode || passcode.length === 0) {
        error.passcode = "The passcode field is required";
    }

    if (error.name || error.passcode) {
        error.color = "red";
        return res.status(400).json(error);
    }

try {
const tg=[];

for (let i = 0; i < 4; i++) {
    let rnd=Math.ceil(Math.random()*(alphanumeric.length -1))
   tg.push(alphanumeric[rnd]);
    
}
const rh=tg.join('');

 const user_id = req.userData.id;

const agent_id= user_id+name.substring(0,3)+rh

const [sert]=await db.query(`SELECT * FROM agents WHERE name=?`,[name])

if (sert.length !==0) {
      error.name = "The name has been taken";
        return res.status(400).json(error)
}
const pass=await bcrypt.hash(passcode,10)
    const [inp]=await db.query(`INSERT INTO agents(userId,type,agentId,name,passcode) VALUE(?,?,?,?,?)`,[user_id,'Agent',agent_id,name,pass]);
    return res.status(200).json({'message':"Agent Created Successfully",'color':'blue'})

} catch (error) {
         return res.status(400).json({'message':"Something Went Wrong ",'color':'red'})
}
})


router.get("/get",AuthMiddleware,async(req,res)=>{
 const user_id = req.userData.id;
 const [all]=await db.query(`SELECT * FROM agents WHERE userId=?`,[user_id]);
 return res.status(200).json(all);
})

router.get("/getAgentField",AuthMiddleware,async(req,res)=>{
    const {agentId}=req.query
    console.log(agentId)
   
                const [checkfield]=await db.query(`SELECT * FROM ftoa WHERE agentId=?`,[agentId]);
              
                if (checkfield.length !==0) {
                    const IDs= checkfield.map((e)=>{return e.fieldId})
                   const [fieldArray]=await db.query(`SELECT * FROM field WHERE id IN (?)`,[IDs]);
                  
                     return res.status(200).json({fieldArray:fieldArray});
                }else{
                     return res.status(200).json({fieldArray:'No Field Assigned'});
                }

})



router.get("/getSingFA",AuthMiddleware, async (req,res)=>{

  const {id}=req.query

  const[field]=await db.query(`SELECT field.*,GROUP_CONCAT(ftoa.agentId) AS agents FROM field LEFT JOIN ftoa ON field.id = ftoa.fieldId WHERE field.id = ? GROUP BY field.id;`,[id]);
   const [parameter]=await db.query(`SELECT name,price,parameterId FROM parameters WHERE userId=?`,[field[0]['user_id']])
    const [records]=await db.query(`SELECT * FROM records WHERE fieldId =?`,[field[0]['id']])
    const [agents]=await db.query(`SELECT agentId,name,id FROM agents WHERE userId =?`,[field[0]['user_id']])
   return res.status(200).json({field,parameter,records,agents})
})


export default router