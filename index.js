import "dotenv/config";
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import your routes/controllers here...

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true, // or your frontend URL
    credentials: true
}));

// 1. Health check route
app.get("/invbackend/health", (req, res) => {
    res.send("EMEKA HEALTH CHECK");
});

// 2. Base root route
app.get("/invbackend", (req, res) => {
    res.send("INVBACKEND API IS RUNNING");
});

// 3. Prefix your API routes with /invbackend
// Example: app.use("/invbackend/api/auth", authRouter);
// Example: app.use("/invbackend/api/users", userRouter);

app.listen(port, () => {
    console.log(`App Running On Port ${port}`);
});
