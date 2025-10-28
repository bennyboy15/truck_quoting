import mongoose from "mongoose";

const truckMakeSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
    },
    code: {
        type: String,
        enum: ["KW", "DAF"]
    }

}, {timestamps: true});

const Truck = mongoose.model("TruckMake", truckMakeSchema);

export default Truck;