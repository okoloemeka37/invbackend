import express from 'express';
import "dotenv/config";
const port=process.env.PORT
const app=express();

app.use((req, res) => {
    res.send(`Express received this path: ${req.url}`);
});

app.listen(port,()=>{
    console.log(`App Running On Port ${port}`)
}) 

