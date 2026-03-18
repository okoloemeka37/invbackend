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


    const error = { name: "", price: "" };
    const { name, price } = req.body;

    // validation
    if (!name || name.length === 0) {
        error.name = "The name field is required";
    }

    if (!price || price.length === 0) {
        error.price = "The price field is required";
    }

    if (error.name || error.price) {
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

const parameterId= user_id+name.substring(0,3)+rh

const [sert]=await db.query(`SELECT * FROM parameters WHERE name=?`,[name])

if (sert.length !==0) {
      error.name = `${name} Parameter already exist`;
        return res.status(400).json(error)
}

    const [inp]=await db.query(`INSERT INTO parameters(userId,parameterId,name,price) VALUE(?,?,?,?)`,[user_id,parameterId,name,price]);
    return res.status(200).json({'message':"Parameter Created Successfully",'color':'blue'})

} catch (error) {
         return res.status(400).json({'message':"Something Went Wrong ",'color':'red'})
}
})


router.get("/get",AuthMiddleware,async(req,res)=>{
 const user_id = req.userData.id;
 const [all]=await db.query(`SELECT * FROM parameters WHERE userId=?`,[user_id]);
 return res.status(200).json(all);
})

export default router