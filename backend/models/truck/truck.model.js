import mongoose from "mongoose";

const truckSchema = new mongoose.Schema({

    stockNo: {
        type: String,
        unique: true,
    },
    chassis: {
        type: String,
        unique: true,
    },
    fleetNo: {
        type: String,
    },
    registration: {
        type: String,
    },
    offlineDate: {
        type: Date,
    },
    deliveryDate: {
        type: Date,
    },
    truckColour: {
        type: String,
    },
    chassisColour: {
        type: String,
    },
    trimColour: {
        type: String,
    },
    status: {
        type: Number,
        default: 0
    },
    model: {
        type: mongoose.Schema.Types.ObjectId, 
            ref: 'TruckModel', 
            required: true 
    }

}, {timestamps: true});

const Truck = mongoose.model("Truck", truckSchema);

export default Truck;