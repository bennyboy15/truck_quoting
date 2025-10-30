import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    code: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
}, {timestamps: true});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;