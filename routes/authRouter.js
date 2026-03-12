import express from "express";
import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
const router = express.Router();
import {AuthMiddleware} from '../Middleware/AuthMiddleware.js'
router.post("/login", async (req, res) => {
    const key='1234r'

    const error = { userName: "", password: "" };
    const { userName, password } = req.body;

    // validation
    if (!userName || userName.length === 0) {
        error.userName = "The userName field is required";
    }

    if (!password || password.length === 0) {
        error.password = "The password field is required";
    }

    if (error.userName || error.password) {
        error.color = "red";
        error['password']=await bcrypt.hash(password,10)
        return res.status(400).json(error);
    }

    try {

        const [users] = await db.query(
            "SELECT * FROM users WHERE userName = ?",
            [userName]
        );

        if (users.length === 0) {
            error.color = "red";
            return res.status(401).json({message: "Invalid username or password" });
        }

        const user = users[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            error.color = "red";
            return res.status(401).json({message: "Invalid username or password"});
        }else{
                const token = jwt.sign({ id: user.id, userName: user.userName },key, { expiresIn: "1d" })

                res.cookie("token", token, {
                 httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge:7 * 24 * 60 * 60 * 1000,
    })
        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                userName: user.userName
            }
        });
    }

    } catch (err) {
        error.color = "red";
        res.status(500).json({ message: "Server error" });
    }
});


/* =========================
   CHECK AUTH
========================= */
router.get("/checkAuth", AuthMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id,userName, email FROM users WHERE userName = ?",
      [req.user.userName]
    )

    return res.status(200).json({
      user: rows[0],
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: "Failed to fetch user",
    })
  }
})



/* =========================
   LOGOUT
========================= */
router.get("/logout", AuthMiddleware, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  })

  return res.status(200).json({
    message: "Logged Out Successfully",
    color: "green",
  })
})


export default router;