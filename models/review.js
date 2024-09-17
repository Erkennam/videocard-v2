import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    product_Id: {type: Number, required: true},
    sender_Id: {type: String, required: true},
    time: {type: String, required: true},
    message: {type: String, required: true},
    rating: {type: Number, required: true}
})

const Review = mongoose.model('review',ReviewSchema);
export default Review;