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

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me", authMiddleware, authController.me);
router.post("/auth/activation", authController.activation);

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

export default router;
