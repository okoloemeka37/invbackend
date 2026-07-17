import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

app.listen(port, () => {
    console.log(`Running on ${port}`);
});
