import express from 'express';
import "dotenv/config";
const port=process.env.PORT
const app=express();

// Add /end to your health check route
app.get("/end/health", (req, res) => {
    res.send("EMEKA HEALTH CHECK");
});

// Update your root route as well
app.get("/end", (req, res) => {
    res.send("ROOT WORKS");
});

app.listen(port,()=>{
    console.log(`App Running On Port ${port}`)
}) 

