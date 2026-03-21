import "dotenv/config";
import express from 'express';
import cors from 'cors'
import cookieParser from "cookie-parser";
import authRouter from './routes/authRouter.js'
import fieldRouter from './routes/fieldRouter.js'
import agentRouter from './routes/agentRouter.js'
import parameterRouter from './routes/parameterRouter.js'
const port=process.env.PORT
const app=express();

//https://client-95np.onrender.com

app.use(express.json())
app.use(cookieParser())
app.use(cors({
     origin:"http://localhost:3000",
     credentials:true
}))


app.use("/api/auth/",authRouter);
app.use("/api/field/",fieldRouter);
app.use("/api/agent/",agentRouter);
app.use("/api/parameter",parameterRouter);


app.listen(port,()=>{
    console.log(`App Running On Port ${port}`)
}) 