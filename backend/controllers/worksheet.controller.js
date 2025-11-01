import Section from "../models/worksheet/section.model.js";

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