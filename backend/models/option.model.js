import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    heading: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Heading',
        required: true
    },
    make: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TruckMake'
    },
    model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TruckModel'
    }
}, { timestamps: true });

export default mongoose.model('Option', optionSchema);