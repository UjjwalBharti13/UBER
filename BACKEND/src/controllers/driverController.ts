import { Request, Response } from "express";
import Driver from "../models/driver.js";


// @desc    Get all drivers
// @route   GET /api/drivers
// @access  Public

export const getDriver = async (
     req : Request,
     res : Response
): Promise<Response> => {
     try {
        const drivers = await Driver.find().sort({createdAt : -1});
        
          
        return res.status(200).json({
             success : true,
             count : drivers.length,
             drivers,
        });
  } catch (error) {
        console.log("Get Drivers Error:", error);
        return res.status(500).json({
             success : false,
             message : "Internal Server Error",
        });
     }
};

// @desc    Get single driver
// @route   GET /api/drivers/:id
// @access  Public

export const getDriverById = async (
     req : Request,
     res : Response
): Promise<Response> => {
     try {
        const driver = await Driver.findById(req.params.id);
          
        if(!driver) {
             return res.status(404).json({
                 success : false,
                 message : "Driver not found"
             });
        }
        return res.status(200).json({
             success : true,
             driver,
        });
     } catch (error) {
        console.log("Get Driver By ID Error:", error);
          return res.status(500).json({
             success : false,
                message : "Internal Server Error",
          });
     }
};


// @desc    Create new driver
// @route   POST /api/drivers
// @access  Public

export const createDriver = async (
    req : Request,
    res : Response
): Promise<Response> => {
     try {
        const {
            first_name,
            last_name,
            profile_image_url,
            car_image_url,
            car_seats,  
            car_name,
            car_number,
            car_model,
            music_system_available,
            ac_available,
            pet_friendly,
            rating,
        } = req.body;

        // cheack existing car number 

        const existingDriver = await Driver.findOne({ car_number});

        if(existingDriver){
             return res.status(400).json({
                 success : false,
                    message : "Car number already exists",
             });
        }

        const newDriver = await Driver.create({
            first_name,
            last_name,
            profile_image_url,
            car_image_url,
            car_seats,
            car_name,
            car_number,
            car_model,
            music_system_available,
            ac_available,
            pet_friendly,
            rating
        });

        return res.status(201).json({
             success : true,
             message : "Driver created successfully",
            newDriver,
        });
     } catch (error) {
          console.log("Create Driver Error:", error);
          return res.status(500).json({
             success : false,
             message : "Internal Server Error",
          });
     }
};


// @desc    Update driver
// @route   PUT /api/drivers/:id
// @access  Public

export const updatedDriver = async (
     req : Request,
     res : Response
): Promise<Response> => {
     try {
        const driver = await Driver.findById(req.params.id);

        if(!driver){
             return res.status(404).json({
                success : false,
                message : "Driver not found",
             });
        }
        const updateDriver = await Driver.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                 new : true,
                 runValidators : true,
            }
        );
        return res.status(200).json({
             success : true,
             message : "Driver updated Successfully",
             updatedDriver
        });

     } catch (error) {
         console.log("Update Driver Error:", error);
         return res.status(500).json({
             success : false,
             message : "Internal Server Error",
         });
     };
};

// @desc    Delete driver
// @route   DELETE /api/drivers/:id
// @access  Public

export const deleteDriver = async ( 
    req : Request,
    res : Response
): Promise<Response> => {
     try {
        const driver = await Driver.findById(req.params.id);
          
        if(!driver){
             return res.status(404).json({
                 success : false,
                 message : "Driver not found",
             });
        }
        await driver.deleteOne();
          return res.status(200).json({
             success : true,
             message : "Driver deleted successfully",
          });


     } catch (error) {
          console.log("Delete Driver Error:", error);
          return res.status(500).json({
             success : false,
             message : "Internal Server Error",
          });  

     };
};
