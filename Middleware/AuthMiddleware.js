import jwt from "jsonwebtoken";
import db from "../db.js";

const key = process.env.jsonkey;

export const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, key);


let [result]='';
   if (decoded.role== "Admin") {
      [result] = await db.query(
      "SELECT id, userName, email,type FROM users WHERE userName = ?",
      [decoded.userName]
    );
       
   }else{
      [result] = await db.query(
      "SELECT id,name,type,agentId FROM agents WHERE name = ?",
      [decoded.userName]
    );
       
   }


    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach DB user to request
    req.userData = result[0];

    // Everything OK → go to next middleware / route
    next();
  } catch (error) {
    console.error("AuthMiddleware error:", error);
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};
