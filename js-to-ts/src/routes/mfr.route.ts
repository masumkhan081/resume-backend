import express from "express";
const router = express.Router();
import {
  createManufacturer,
  getManufacturers,
  getSingleManufacturer,
  updateManufacturer,
  deleteManufacturer,
} from "../controllers/mfr.controller.js"; // controller functions
import validateRequest from "../middlewares/validateRequest.js";
import { manufacturerSchema } from "../schemas/mfr.schema.js";
import { validateObjectId } from "../middlewares/validateId.js";
import accessControl from "../middlewares/aceessControl.js";
import { userRoles } from "../config/constants.js";

router.get("/", getManufacturers);

router.get(
  "/:id",
  validateObjectId,
  getSingleManufacturer
);

router.post("/", accessControl([userRoles.admin]), validateRequest(manufacturerSchema), createManufacturer);

router.patch("/:id",accessControl([userRoles.admin]), validateObjectId,updateManufacturer);

router.delete("/:id",accessControl([userRoles.admin]), validateObjectId,deleteManufacturer);

//
export default router;
