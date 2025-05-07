import express, { Request, Response } from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { ROLES } from "../utils/constant";
import aclMiddleware from "../middlewares/acl.middleware";
import mediaMiddleware from "../middlewares/media.middleware";
import mediaController from "../controllers/media.controller";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me", authMiddleware, authController.me);
router.post("/auth/activation", authController.activation);

router.post(
  "/media/upload-single",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN, ROLES.USER]),
    mediaMiddleware.single("file"),
  ],
  mediaController.single
);
router.post(
  "/media/upload-multiple",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN, ROLES.USER]),
    mediaMiddleware.multiple("files"),
  ],
  mediaController.multiple
);
router.delete(
  "/media/remove",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.USER])],
  mediaController.remove
);

export default router;
