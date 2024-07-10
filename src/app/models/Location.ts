import mongoose, { Document, ObjectId } from "mongoose";

export interface ILocationProps{
    [x: string]: any;
    _id?:ObjectId | string | undefined;
    name: string;
    address: string;
    telephone: number;
    latitude: number;
    longitude: number;
    createdAt?: string;
    updatedAt?: string;
}
export interface ILocationSchema extends Document{
    _id?:ObjectId | string | undefined;
    name: string;
    address: string;
    telephone: string;
    latitude: string;
    longitude: string;
    createdAt?: string;
    updatedAt?: string;
}

const LocationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    telephone: {type: String, required: true},
    latitude: {type: String, required: true},
    longitude: {type: String, required: true},
}, {versionKey: false, timestamps: true})

const Locations = mongoose.models.Locations || mongoose.model("Locations", LocationSchema);
export default Locations;