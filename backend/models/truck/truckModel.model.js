import mongoose from "mongoose";

const truckModelSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
    },
    category: {
        type: String
    },
    make: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'TruckMake', 
        required: true 
    }

}, {timestamps: true});

const Truck = mongoose.model("TruckModel", truckModelSchema);

export default Truck;