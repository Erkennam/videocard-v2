import mongoose from "mongoose";
const Schema = mongoose.Schema;

const videocardSchema = new Schema({
    id: { type: Number, required: true },
    img: { type: [String], required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    frequency: { type: Number, required: true },
    video: { type: String, required: true },
    memory: { type: Number, required: true },
    videoFrequency: { type: Number, required: true },
    energy: { type: Number, required: true },
    reviews: { type: [String], default: [] }
})

const Videocard = mongoose.model('Videocard', videocardSchema);
export default Videocard;