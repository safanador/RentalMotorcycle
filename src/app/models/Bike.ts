import mongoose,{ Document, ObjectId } from "mongoose";
import {ILocationSchema} from "./Location";

export interface IRentalBike {
    _id?:ObjectId | string | undefined;
    name: string;
    brand: string;
    year: number;
    price: number;
    description: string;
    imageUrl: string;
    bikeType: string;
    odometer: number;
    location: ILocationSchema["_id"];
    createdAt?: string;
    updatedAt?: string;
}

export interface IRentalBikeSchema extends Document{
    _id?:ObjectId | string | undefined;
    name: string;
    brand: string;
    year: string;
    price: number;
    description: string;
    imageUrl: string;
    bikeType: string;
    odometer: string;
    location: ILocationSchema["_id"];
    createdAt?: string;
    updatedAt?: string;
}

 const RentalBikeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    year: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    bikeType: { type: String, required: true },
    odometer: { type: String, required: true },
    location: {type: mongoose.Schema.Types.ObjectId, ref:"Location"},
 }, {timestamps:true, versionKey: false }, // esto crea createdAt, updateAt internamente sin declararlo
 )


 const RentBikes = mongoose.models.RentBikes || mongoose.model("RentBikes", RentalBikeSchema);

 export default RentBikes;