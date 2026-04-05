import express from "express";
import { register, login } from "../controllers/authController.js";
import { registerValidator } from "../utils/validators.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", login);

export default router;