import mongoose, { Document, ObjectId } from "mongoose";

export interface ITourSchema extends Document{

    _id?: ObjectId | string | undefined;
    title: string;
    operator: string;
    description:string;
    included:string;
    notIncluded:string;
    itinerary:string;
    initAddress:string;
    initDirections:string;
    finalAddress:string;
    finalDirections:string;
    accessibility:string;
    additionalInfo:string;
    cancelPolicy:string;
    faq:string;
    help:string;
    price:string;
    imageUrl1:string;
    imageUrl2:string;
    imageUrl3:string;
    imageUrl4:string;
    imageUrl5:string;
    imageUrl6:string;
    imageUrl7:string;
}

const TourSchema = new mongoose.Schema({

    title: {type: String, required: true} ,
    operator: {type: String, required: true},
    description: {type: String, required: true},
    included: {type: String, required: true},
    notIncluded: {type: String, required: true},
    itinerary: {type: String, required: true},
    initAddress: {type: String, required: true},
    initDirections: {type: String, required: true},
    finalAddress: {type: String, required: true},
    finalDirections: {type: String, required: true},
    accessibility: {type: String, required: true},
    additionalInfo: {type: String, required: true},
    cancelPolicy: {type: String, required: true},
    faq: {type: String, required: true},
    help:{type: String, required: true},
    price: {type: String, required: true},
    imageUrl1:{type: String, required: true},
    imageUrl2:{type: String, required: true},
    imageUrl3:{type: String, required: true},
    imageUrl4:{type: String, required: true},
    imageUrl5:{type: String, required: true},
    imageUrl6:{type: String, required: true},
    imageUrl7:{type: String, required: true},

}, {versionKey: false, timestamps: true})

const Tours = mongoose.models.Tours || mongoose.model("Tours", TourSchema);
export default Tours;