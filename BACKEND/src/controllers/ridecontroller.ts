import { Request, Response } from "express";
import User from "../models/user.js";
import Driver from "../models/driver.js";
import Ride from "../models/ride.js";
import crypto from "crypto";
import { success } from "zod";

// @desc    Create new ride
// @route   POST /api/rides
// @access  Public

const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
     
} 
const otp = generateOTP();
 

export const createRide = async (
     req : Request,
     res : Response
): Promise<Response> => {
     try {
       const {
                user_id,
                driver_id,
                origin_address,
                destination_address,
                origin_latitude,
                origin_longitude,
                destination_latitude,
                destination_longitude,
                ride_status,
                fare_price,
                payment_status,
                distance,
                estimated_arrival_time,
                otp,
                schedule_at
            } = req.body;

        // check if user and driver exist
        const user = await User.findById(user_id);

        if(!user){
             return res.status(404).json({
                 success : false,
                 message : "User not found",
             });
        }

        // check if driver exist

        const driver = await Driver.findById(driver_id);

         if(!driver){
             return res.status(404).json({
                 success : false,
                 message : "Driver not found",
             });
         }
        
         // create new ride

         const newRide = await Ride.create({
                user_id,
                driver_id,
                origin_address,
                destination_address,
                origin_latitude,
                origin_longitude,
                destination_latitude,
                destination_longitude,
                ride_status,
                fare_price,
                payment_status,
                distance,
                estimated_arrival_time,
                otp,
                schedule_at
            });

         return res.status(201).json({
             success : true,
             message : "Ride created successfully",
             newRide
         });
     } catch (error) {
        console.log("Create Ride Error:", error);
           return res.status(500).json({
             success : false,
                message : "Internal Server Error",
            });
        }
};

// @desc    Get all rides by Clerk User ID
// @route   GET /api/rides/user/:userId
// @access  Public

export const getRidesByUserId = async(
     req : Request,
     res : Response
): Promise<Response> => {
     try {
        const { userId } = req.params;
          
        // find user using clerk user id
        const user = await User.findOne({
             clerkId : userId,
        });

        if(!user){
             return res.status(404).json({
                 success : false,
                 message : "User not found",
             });
        }
        // get rides
        const rides = await Ride.find({
             user_id : user._id,
        })
           .populate("user_id")
           .populate("driver_id")
           .sort({createdAt : -1 });

           return res.status(200).json({
             success : true,
             count : rides.length,
             rides
           });
         
     } catch (error) {
          console.log("Get Rides By User ID Error:", error);
           
              return res.status(500).json({
                 success : false,
                 message : "Internal Server Error",
              });
     };
};


// @desc    Get single ride by ID
// @route   GET /api/rides/:id
// @access  Public

export const getRideById = async( 
    req : Request,
    res : Response
): Promise<Response> => {
     try {
         const ride = await Ride.findById(req.params.id)
              .populate("user_id")
              .populate("driver_id");

              if(!ride){
                 return res.status(404).json({
                     success : false,
                     message : "Ride not found",
                 });
              }

              return res.status(200).json({
                 success : true,
                 message : "Ride fetched successfully",
                 ride
              });

     } catch (error) {
          console.log("Get Ride By ID Error:", error);
             
          return res.status(500).json({
             success : false,
                message : "Internal Server Error",
          });
     }
};

// @desc    Update ride
// @route   PUT /api/rides/:id
// @access  Public

export const updateRide = async(
     req : Request,
     res : Response
): Promise<Response> => {
      
    try {
         const ride = await Ride.findById(req.params.id);

         if(!ride){ 
            return res.status(404).json({
                 success : false,
                 message : "Ride not found",
            });
         }
         // optional driver validation

         if(req.body.driver_id){
             const driver = await Driver.findById(req.body.driver_id);
               
             if(!driver){
                 return res.status(404).json({
                     success : false,
                     message : "Driver not found",
                 });
             }
         }

         // optional user validation

         if(req.body.user_id){
             const user = await User.findById(req.body.user_id);

             if(!user){
                 return res.status(404).json({
                     success : false,
                     message : "User not found",
                 });
             }
         }

         const updatedRide = await Ride.findByIdAndUpdate(
               req.params.id,
               req.body,
               {
                 new : true,
                 runValidators : true,
               }
         )
           .populate("user_id")
           .populate("driver_id");

           return res.status(200).json({
             success : true,
                message : "Ride updated successfully",
                updatedRide
           });

    } catch (error) {
        console.log("Update Ride Error:", error);

        return res.status(500).json({
             success : false,
                message : "Internal Server Error",
        });
    }
};


// @desc    Delete ride
// @route   DELETE /api/rides/:id
// @access  Public

export const deleteRide = async(
     req : Request,
     res : Response
): Promise<Response> => {
      
    try {
        const ride = await Ride.findById(req.params.id);
         
         if(!ride){
             return res.status(401).json({
                 success : false,
                    message : "Ride not found",
             });
         } 
         await ride.deleteOne();

         return res.status(200).json({
             success : true,
                message : "Ride deleted successfully",
         });

    } catch (error) {
         console.log("Delete Ride Error:", error);
           return res.status(500).json({
             success : false,
                message : "Internal Server Error",
           });
        
    }
};

// verify otp

export const verifyRideOTP = async(
      req : Request,
      res : Response,
): Promise<Response> => {
      try {
         const { rideId, otp } = req.body;
         const ride = await Ride.findById(rideId);
         if(!ride){
              return res.status(404).json({
                 success : false,
                 message : "Ride Not Found",
              });
         } 
         if(ride.otp != otp){
             return res.status(400).json({
                 success : false,
                 message : "Invalid OTP",
             });
         }
         if(ride.ride_status !== "accepted"){
             return res.status(400).json({
                 success : false,
                 message : "Ride not accepted yet",
             });
         }
         ride.ride_status = "ongoing";
         await ride.save();

         return res.json({
             success : true,
             message : "OTP verified , ride started",
         });

      } catch (error) {
          console.log("OTP Verification Erro", error);
           
          return res.status(500).json({
             success : false,
             message : "Internal server error",
          });
      }
};

