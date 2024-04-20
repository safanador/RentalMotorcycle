import mongoose, { Document, ObjectId } from "mongoose";

export interface IReservationSchema extends Document{

    _id?:ObjectId | string | undefined;
    paymentId: number ;
    amount: number;
    netAmount: number;
    name: string;
    phone: string;
    email: string;
    location: string;
    bike: string;
    pickUpDate: string;
    dropOffDate: string;
    pickUpTime: string;
    typeOfReservation: string;
    used: string;
    party:number;
}

const ReservationSchema = new mongoose.Schema({

    paymentId: {type: Number, required: true} ,
    amount: {type: Number, required: true},
    netAmount: {type: Number, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    location: {type: String, required: true},
    bike: {type: String, required: true},
    pickUpDate: {type: String, required: true},
    dropOffDate: {type: String, required: true},
    pickUpTime: {type: String, required: true},
    typeOfReservation: {type: String, required: true},
    used: {type: String, required: true},
    party:{type: Number, required: true},
}, {versionKey: false, timestamps: true})

const Reservations = mongoose.models.Reservations || mongoose.model("Reservations", ReservationSchema);
export default Reservations;