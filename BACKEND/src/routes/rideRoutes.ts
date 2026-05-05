import express from "express";
const router = express.Router();

import {
     createRide,
     getRidesByUserId,
     getRideById,
     updateRide,
     deleteRide, 

} from "../controllers/ridecontroller.js";


// CREATE RIDE
router.post("/", createRide);       

// GET RIDE BY USER CLERK_ID
router.get("/user/:userId", getRidesByUserId);

// GET RIDE BY ID
router.get("/:id", getRideById);

// UPDATE RIDE
router.put("/:id", updateRide);         
// DELETE RIDE
router.delete("/:id", deleteRide);

export default router;

 

