import mongoose , { Schema, Document } from "mongoose";
import { timeStamp } from "node:console";

export interface IUser extends Document {
     name : string;
     email : string;
     clerkId : string;   
}

const UserSchema : Schema = new Schema<IUser>(
    {
         name : {
             type : String,
             required : true,
         },

         email : {
             type : String,
             required : true,
             unique : true,
         },
         clerkId : {
             type : String,
             required : true,
             unique : true,
         },

    },
   {
    timestamps : true,
   }
);

export default mongoose.model<IUser>("User", UserSchema);
