import mongoose from 'mongoose';
import Option from '../models/option.model.js';
import TruckMake from '../models/truck/truckMake.model.js';
import TruckModel from '../models/truck/truckModel.model.js';
import Heading from '../models/worksheet/heading.model.js';
import { configDotenv } from 'dotenv';

configDotenv();

async function seedOptions() {
    try {
        // Get some reference data first
        const makes = await TruckMake.find();
        const models = await TruckModel.find();
        const headings = await Heading.find();

        // Example options - adjust based on your actual headings
        const optionsData = [
            // Generic options (no make/model specific)
            {
                label: "Customer to pick-up",
                value: 1,
                heading: headings.find(h => h.name === "Freight")?._id,
            },
            {
                label: "Factory drop-off",
                value: 2,
                heading: headings.find(h => h.name === "Freight")?._id,
            },

            // Make-specific options
            {
                label: "2.5KG Fire-Extinguisher",
                value: 1,
                heading: headings.find(h => h.name === "Fire-Extinguisher")?._id,
                make: makes.find(m => m.name === "Kenworth")?._id
            },
            {
                label: "1.5KG Fire-Extinguisher",
                value: 2,
                heading: headings.find(h => h.name === "Fire-Extinguisher")?._id,
                make: makes.find(m => m.name === "Kenworth")?._id
            },
        ];

        // Clear existing options
        await Option.deleteMany({});

        // Insert new options
        await Option.insertMany(optionsData);

        console.log('Options seeded successfully!');
    } catch (error) {
        console.error('Error seeding options:', error);
    }
}

// Run the seed function
mongoose.connect(process.env.MONGO_URI)
    .then(() => seedOptions())
    .then(() => mongoose.connection.close());