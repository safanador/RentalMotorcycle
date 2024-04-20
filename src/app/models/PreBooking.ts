import mongoose, { Document, ObjectId } from "mongoose";
import { IRentalBikeSchema } from "./Bike";
import { ILocationSchema } from "./Location";

export interface IPreReservationSchema extends Document{
    _id?:ObjectId | string | undefined;
    locationId: ILocationSchema["_id"]
    pickUpDate: any;
    dropOffDate: any;
    pickUpTime:any;
    dropOffTime:any;
    phoneNumber: string;
    email:string;
    bikeId: IRentalBikeSchema["_id"];
    createdAt?: string;
    updatedAt?: string;
}

const PreReservationSchema = new mongoose.Schema({
    locationId: {type: mongoose.Schema.Types.ObjectId, ref:"Locations"},
    pickUpDate: {type: String, required: true},
    dropOffDate: {type: String, required: true},
    pickUpTime: {type: String, required: true},
    dropOffTime: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    email: {type: String, required: true},
    bikeId:{type: mongoose.Schema.Types.ObjectId, ref:"RentBikes"},
}, {versionKey: false, timestamps: true})

const PreReservation = mongoose.models.PreReservation || mongoose.model("PreReservation", PreReservationSchema);
export default PreReservation;