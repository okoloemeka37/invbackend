import "dotenv/config";
import express from 'express';
import cors from 'cors'
import cookieParser from "cookie-parser";
import authRouter from './routes/authRouter.js'
import fieldRouter from './routes/fieldRouter.js'
const port=process.env.PORT
const app=express();



app.use(express.json())
app.use(cookieParser())
app.use(cors({
     origin:"http://localhost:3000",
     credentials:true
}))


app.use("/api/auth/",authRouter);
app.use("/api/field/",fieldRouter)


app.listen(port,()=>{
    console.log(`App Running On Port ${port}`)
}) 