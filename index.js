import "dotenv/config";
import express from 'express';
import cors from 'cors'
import cookieParser from "cookie-parser";
import authRouter from './routes/authRouter.js'
import fieldRouter from './routes/fieldRouter.js'
import agentRouter from './routes/agentRouter.js'
import recordsRouter from './routes/recordsRouter.js'
import parameterRouter from './routes/parameterRouter.js'
const port=process.env.PORT
const app=express();

//http://localhost:3000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
     origin:"https://client-95np.onrender.com",
     credentials:true
}))


app.use("/api/auth/",authRouter);
app.use("/api/field/",fieldRouter);
app.use("/api/agent/",agentRouter);
app.use("/api/parameter",parameterRouter);
app.use("/api/records",recordsRouter);

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});


app.listen(port,()=>{
    console.log(`App Running On Port ${port}`)
}) 
