import mongoose , { Schema, Document, Types } from "mongoose";

export interface IRide extends Document{
      origin_address : string;
      destination_address : string;

      origin_longitude : number;
      origin_latitude : number;

      destination_longitude : number;
      destination_latitude : number;

      schedule_at : Date;
      fare_price : number;
      payment_status : string;
      ride_status : string; 
      distance : number;
      otp : string;
      is_schedule_ride : boolean;
      estimated_arrival_time : number;

      driver_id : Types.ObjectId;
      user_id : Types.ObjectId;

}

const RideSchema : Schema = new Schema<IRide>(
    {
         origin_address : {
             type : String,
             required : true,

         },
         destination_address : {
             type : String,
             required : true,
         },
         origin_longitude : {
             type : Number,
             required : true,
         },
         origin_latitude : {
             type : Number,
             requuired : true,
         },
         destination_longitude : {
             type : Number,
             required : true,
         },
         destination_latitude : {
             type : Number,
             required : true,
         },
         schedule_at : {
             type : Date,
             required : true,
         },
         fare_price : {
             type : Number,
             required : true,
         },
         payment_status : {
             type : String,
             enum : ["pending", "completed", "failed"],
             default : "pending",
         },
         ride_status : {
             type : String,
             enum : ["pending", "accepted", "ongoing", "completed", "cancelled"],
             default : "pending",
         },
         distance : {
             type : Number,
             required : true,
         },
         otp : {
             type : String,
             required : true,
         },
         is_schedule_ride : {
             type : Boolean,
             default : false,
         },
         estimated_arrival_time : {
             type : Number,// in minuted
             required : true,

         },
         driver_id : { 
            type : Schema.Types.ObjectId,
            ref : "Driver",
            required : true,
         },
         user_id : {
             type : Schema.Types.ObjectId,
             ref : "User",
             required : true,
         },
    },
    { 
         timestamps : true,
    }
);

export default mongoose.model<IRide>("Ride" , RideSchema);
