import { Router } from "express";
import { login, checkLoginStatus, logout } from "../auth/auth.js";
import { verifyUser } from "../middleware/verify.js";

const router = Router();

router.post("/login", login);
router.get("/check", verifyUser, checkLoginStatus);
router.delete("/logout", verifyUser, logout);

export default router;
