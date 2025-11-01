import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        section_id: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

const Section = mongoose.model("Section", SectionSchema);

export default Section;