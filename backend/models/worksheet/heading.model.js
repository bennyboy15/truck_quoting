import mongoose from "mongoose";

const HeadingSchema = mongoose.Schema({
    orderId: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    section: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Section', 
        required: true
    }
});

const Heading = new mongoose.model("Heading", HeadingSchema);

export default Heading;