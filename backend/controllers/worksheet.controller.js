import mongoose from 'mongoose';
import Heading from "../models/worksheet/heading.model.js";
import Section from "../models/worksheet/section.model.js";
import Option from '../models/option.model.js';

export async function getSections(req,res) {
    try {
        const sections = await Section.find();
        return res.status(200).json(sections);
    } catch (error) {
        console.log("Error in getSection worksheet controller", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

export async function createSection(req,res) {
    try {
        const {name, section_id, description} = req.body;

        if (!name || !section_id) {
            return res.status(400).json({message: "Missing required fields"});
        }

        const sectionId = parseInt(section_id);
        const newSection = new Section({name, section_id:sectionId, description});
        await newSection.save();
        return res.status(201).json(newSection);
    } catch (error) {
        console.log("Error in createSection worksheet controller", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

export async function getHeadings(req,res) {
    try {
        const headings = await Heading.find().populate("section");
        return res.status(200).json(headings);
    } catch (error) {
        console.log("Error in getHeadings worksheet controller", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

export async function createHeading(req,res) {
    try {
        const {name, section, orderId} = req.body;

        if (!name || !section || orderId === undefined) {
            return res.status(400).json({message: "Missing required fields"});
        }

        // Remove parseInt since section should be an ObjectId string
        const newHeading = new Heading({
            name,
            section, // Keep as string to let Mongoose handle ObjectId casting
            orderId: Number(orderId)
        });
        
        await newHeading.save();
        return res.status(201).json(newHeading);
    } catch (error) {
        console.log("Error in createHeading worksheet controller", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

export async function getOptions(req, res) {
    try {
        const { heading, make, model } = req.query;

        // simple id validation
        if (heading && !mongoose.Types.ObjectId.isValid(heading)) {
            return res.status(400).json({ message: "Invalid heading id" });
        }
        if (make && !mongoose.Types.ObjectId.isValid(make)) {
            return res.status(400).json({ message: "Invalid make id" });
        }
        if (model && !mongoose.Types.ObjectId.isValid(model)) {
            return res.status(400).json({ message: "Invalid model id" });
        }

        const query = {};
        if (heading) query.heading = heading;

        // include options that either match the make/model OR have no make/model (generic)
        const makeOrGeneric = make ? [{ make }, { make: { $exists: false } }, { make: null }] : null;
        const modelOrGeneric = model ? [{ model }, { model: { $exists: false } }, { model: null }] : null;

        if (make && model) {
            query.$and = [
                { $or: makeOrGeneric },
                { $or: modelOrGeneric },
            ];
        } else if (make) {
            query.$or = makeOrGeneric;
        } else if (model) {
            query.$or = modelOrGeneric;
        }

        const options = await Option.find(query)
            .populate('make')
            .populate('model')
            .populate('heading');

        return res.status(200).json(options);
    } catch (error) {
        console.log("Error in getOptions controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createOption(req, res) {
    try {
        const { label, value, heading, make, model } = req.body;

        if (!label || !value || !heading) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newOption = new Option({
            label,
            value,
            heading,
            make,
            model
        });

        await newOption.save();
        return res.status(201).json({ message: "Option created successfully" });
    } catch (error) {
        console.log("Error in createOption controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
