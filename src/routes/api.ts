import express from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";
import mediaMiddleware from "../middlewares/media.middleware";
import mediaController from "../controllers/media.controller";
import categoryController from "../controllers/category.controller";
import regionController from "../controllers/region.controller";
import stationController from "../controllers/station.controller";
import predictionController from "../controllers/prediction.controller";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me", authMiddleware, authController.me);
router.post("/auth/activation", authController.activation);
router.put(
  "/auth/update-profile",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.USER])],
  authController.updateProfile
  /*
  #swagger.tags = ['Auth']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/UpdateProfileRequest"
    }
  }
  */
);
router.put(
  "/auth/update-password",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.USER])],
  authController.updatePassword
  /*
  #swagger.tags = ['Auth']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/UpdatePasswordRequest"
    }
  }
  */
);

router.post(
  "/category",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.create
  /**
  #swagger.tags = ["Category"]
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateCategoryRequest"
    }
  }
  */
);
router.get(
  "/category",
  categoryController.findAll
  /**
  #swagger.tags = ["Category"]
  */
);
router.get(
  "/category/:id",
  categoryController.findOne
  /**
  #swagger.tags = ["Category"]
  */
);
router.put(
  "/category/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.update
  /**
  #swagger.tags = ["Category"]
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateCategoryRequest"
    }
  }
  */
);
router.delete(
  "/category/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.remove
  /**
  #swagger.tags = ["Category"]
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

router.post(
  "/stations",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  stationController.create
  /**
  #swagger.tags = ["Stations"]
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateStationRequest"
    }
  }
  */
);
router.get(
  "/stations",
  stationController.findAll
  /**
  #swagger.tags = ["Stations"]
  */
);
router.get(
  "/stations/:id",
  stationController.findOne
  /**
  #swagger.tags = ["Stations"]
  */
);
router.put(
  "/stations/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  stationController.update
  /**
  #swagger.tags = ["Stations"]
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateStationRequest"
    }
  }
  */
);
router.delete(
  "/stations/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  stationController.remove
  /**
  #swagger.tags = ["Stations"]
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);
router.get(
  "/stations/:slug/slug",
  stationController.findOneBySlug
  /**
  #swagger.tags = ["Stations"]
  */
);

router.get(
  "/regions",
  regionController.getAllProvinces
  /**
  #swagger.tags = ["Regions"]
  */
);
router.get(
  "/regions/:id/province",
  regionController.getProvince
  /**
  #swagger.tags = ["Regions"]
  */
);
router.get(
  "/regions/:id/regency",
  regionController.getRegency
  /**
  #swagger.tags = ["Regions"]
  */
);
router.get(
  "/regions/:id/district",
  regionController.getDistrict
  /**
  #swagger.tags = ["Regions"]
  */
);
router.get(
  "/regions/:id/village",
  regionController.getVillage
  /**
  #swagger.tags = ["Regions"]
  */
);
router.get(
  "/regions-search",
  regionController.findByCity
  /**
  #swagger.tags = ["Regions"]
  */
);

router.post(
  "/media/upload-single",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN, ROLES.USER]),
    mediaMiddleware.single("file"),
  ],
  mediaController.single
  /**
  #swagger.tags = ["Media"]
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    content: {
      "multipart/form-data": {
        schema : {
          type: "object",
          properties: {
            file: {
              type: "string",
              format: "binary"
            }
          }
        }
      }
    }
  }
  */
);
router.post(
  "/media/upload-multiple",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN, ROLES.USER]),
    mediaMiddleware.multiple("files"),
  ],
  mediaController.multiple
  /**
  #swagger.tags = ["Media"]
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    content: {
      "multipart/form-data": {
        schema : {
          type: "object",
          properties: {
            files: {
              type: "array",
              items: {
                type: "string",
                format: "binary"
              }
            }
          }
        }
      }
    }
  }
  */
);
router.delete(
  "/media/remove",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.USER])],
  mediaController.remove
  /**
  #swagger.tags = ["Media"]
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/RemoveMediaRequest"
    }
  }
  */
);

router.post(
  "/predict",
  [authMiddleware], // Middleware mediaMiddleware dihapus
  predictionController.predict
  /**
  #swagger.tags = ["Prediction"]
  #swagger.summary = "Predict image classification using a trained model via Cloudinary URL"
  #swagger.description = "Provide a Cloudinary image URL to get its classification from the ML model."
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            imageUrl: {
              type: "string",
              format: "uri",
              example: "https://res.cloudinary.com/your-cloud/image/upload/v123456/sample.jpg"
            }
          },
          required: ["imageUrl"]
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "Prediction successful",
    schema: {
      type: "object",
      properties: {
        label: { type: "string", example: "SANGAT_PADAT" },
        confidence: { type: "number", example: 0.98 },
        allScores: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              score: { type: "number" }
            }
          }
        }
      }
    }
  }
  */
);

export default router;
