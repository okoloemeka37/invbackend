import express from 'express'
import db from "../db.js";
import bcrypt from "bcryptjs";
import { AuthMiddleware } from '../Middleware/AuthMiddleware.js';
const router=express.Router()


router.post("create",AuthMiddleware,async(req,res)=>{
    
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

console.log(rh)

     /*  const user_id = req.userData.id;
      const agent_id=user_id + name.substring(1,4)
    const [inp]=await db.query(`INSERT INTO agents(user_id,agent_id,name,passcode) VALUE(?,?,?,?)`);
 */
} catch (error) {
     error.color = "red";
        return res.status(400).json(error);
}
})

export default router