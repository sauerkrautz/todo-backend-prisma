import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  dropAllTables,
  updateUser,
} from "../controllers/userController.js";

import { adminOnly, verifyUser } from "../middleware/verify.js";

const router = Router();

router.get("/users", verifyUser, adminOnly, getAllUsers);
// router.get("/oop", verifyUser, user.getAllusers);
router.get("/user/:id", verifyUser, getUserById);
router.post("/user", createUser);
router.patch("/user/:id", verifyUser, updateUser);
router.delete("/user/:id", verifyUser, adminOnly, deleteUser);
router.delete("/drop", verifyUser, adminOnly, dropAllTables);

export default router;
