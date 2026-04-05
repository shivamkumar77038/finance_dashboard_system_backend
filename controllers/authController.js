import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return errorResponse(res, 409, "User exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role,
  });

  return successResponse(res, 201, "User registered", user);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return errorResponse(res, 404, "User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return errorResponse(res, 401, "Invalid credentials");

  const token = generateToken(user);

  return successResponse(res, 200, "Login success", { token });
});