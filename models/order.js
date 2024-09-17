import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    username: {type: String, required: true},
    orders: {type: [mongoose.Schema.Types.Mixed], required: true},
    date: {type: String, required: true},
})

const Order = mongoose.model('order',orderSchema);
export default Order;