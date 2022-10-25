import { Router } from "express";
import { createTodos, getAllTodos } from "../controllers/todoController.js";
import { verifyUser } from "../middleware/verify.js";

const router = Router();

router.get("/todos", verifyUser, getAllTodos);
router.post("/todo", verifyUser, createTodos);

export default router;
