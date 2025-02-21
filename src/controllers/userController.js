import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register a user
export const registerUser = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });
        if (!email.includes("@") || !email.includes(".com")) return res.status(400).json({ message: "Invalid email" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ userName, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Login a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.json({ token, user: { id: user._id, name: user.userName, email: user.email, role: user.role }, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
