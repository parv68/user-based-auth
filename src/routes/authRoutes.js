import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import { authenticateUser, checkRole } from "../middlewares/authMiddelware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authenticateUser, (req, res) => {
    res.json({ user: req.user });
});

router.get("/admin", authenticateUser, checkRole(["admin"]), (req, res) => {
    res.json({ message: "Welcome, Admin!" });
});

export default router;
