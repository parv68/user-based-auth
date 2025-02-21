import jwt from "jsonwebtoken"
import {User} from "../models/userModel.js"

export const authenticateUser = async(req, res, next) => {
    try {
        const token = await req.header("Authorization")
        if(!token) return res.status(401).json({message:"Access Denied"})

        const decoded = jwt.decode(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select("-password"); 
        if (!req.user) return res.status(404).json({ message: "User not found." });
        next()
    } catch (error) {
        res.status(401).json({message: "invalid or expired token", error: error})
    }
}

export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            return res.status(403).json({ message: "Unauthorized" });
        }
        next();
    }
}