import express, {Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

//import connectDB  from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";  


dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8000;
 
app.use(express.json());


// Routes
app.use("/api/users", userRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/rides", rideRoutes);



// Health Check Route

app.get("/", ( 
     req : Request,
     res : Response,

) => {
   res.status(200).json({
       success : true,
        message : "Welcome to the Uber Clone API",
   });
});

// 404 handler

app.use((
   req : Request,
   res : Response,
) => {
   res.status(404).json({
     success : false,
     message : "Route not found",
   });
});

// Eror handler

app.use(( 
    err : Error,
    req : Request,
    res : Response,
    next : NextFunction, 
) => {
   return res.status(500).json({
        success : false,
        message : "Internal Server Error",
          error : err.message,
   });
});

const connectDB = async() => {
   try {
     if(!process.env.MONGO_URI){
         throw new Error("MONGO_URI is not defined in environment variables");
     }
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected successfully");
      app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
      });
   } catch (error) {
     console.log("Database Connection Error:", error);
      process.exit(1);
   };
};

connectDB();

