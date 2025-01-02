import express from "express";
const router = express.Router();
import {
  getData, updateData
} from "../controllers/education.and.experiences";
//
router.get("/", (req, res) => {
  getData(req, res);
});

router.patch("/", (req, res) => {
  updateData(req, res);
});

export default router;

