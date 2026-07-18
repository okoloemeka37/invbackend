console.log("=== NEW VERSION LOADED ===");

import "dotenv/config";
import express from 'express';
import cors from 'cors'
const port=process.env.PORT
const app=express();

//http://localhost:3000

//app.use(express.json())

app.get("/health", (req, res) => {
    res.send("EMEKA HEALTH CHECK");
});
//app.use(cookieParser())

/*app.use(cors({
     origin:"https://client-95np.onrender.com",
     credentials:true
})) */


/*app.use("/api/auth/",authRouter);
app.use("/api/field/",fieldRouter);
app.use("/api/agent/",agentRouter);
app.use("/api/parameter",parameterRouter);
app.use("/api/records",recordsRouter);*/
app.get("/", (req, res) => {
    res.send("ROOT WORKS");
});

app.listen(port,()=>{
    console.log(`App Running On Port ${port}`)
}) 
