import mongoose , { Schema, Document } from "mongoose";


export interface IDriver extends Document {
     first_name : string;
     last_name : string;
     profile_image_url : string;
     car_image_url : string;
     car_seats : number;
     car_name : string;
     car_number : string;
     car_model : string;
     music_system_available : boolean;
     ac_available : boolean;
     pet_friendly : boolean;
     rating : number;

}

const DriverSchema : Schema = new Schema<IDriver>(
    {
         first_name : {
             type : String,
             required : true,
         },
         last_name : {
             type : String,
             required : true,
         },
         profile_image_url : {
             type : String,
             required : true,
         },
         car_image_url : {
             type : String,
             required : true,
         },
         car_seats : {
             type : Number,
             required : true
         },
         car_name : {
             type : String

         },
         car_number : {
             type : String,
             required : true,
             unique : true
         },
         car_model : {
             type : String,
             required : true
         },
         music_system_available : {
             type : Boolean,
             default : false
         },
         ac_available : {
             type : Boolean,
             default : false
         },
         pet_friendly : {
             type : Boolean,
             default : false
         },
         rating : {
             type : Number,
             default : 0
         },
    },
    {
         timestamps : true,
    }
);

export default mongoose.model<IDriver>("Driver", DriverSchema);