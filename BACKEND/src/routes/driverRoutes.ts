import express from "express";
const router = express.Router();

import{
     getDriver,
     getDriverById,
     createDriver,
     updatedDriver,
     deleteDriver,
}from "../controllers/driverController.js";


// GET ALL DRIVERS
router.get("/", getDriver);

// GET SINGLE DRIVER
router.get("/:id", getDriverById);

// CREATE DRIVER
router.post("/", createDriver);

// UPDATE DRIVER
router.put("/:id", updatedDriver);

// DELETE DRIVER
router.delete("/:id", deleteDriver);

export default router;
