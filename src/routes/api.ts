import express, { Request, Response } from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { ROLES } from "../utils/constant";
import aclMiddleware from "../middlewares/acl.middleware";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me", authMiddleware, authController.me);
router.post("/auth/activation", authController.activation);

router.get(
  "/test-acl",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.USER])],
  (req: Request, res: Response) => {
    res.status(200).json({
      data: "success",
      message: "OK",
    });
  }
);

export default router;
