import Truck from "../models/truck/truck.model.js";
import TruckModel from "../models/truck/truckModel.model.js"
import TruckMake from "../models/truck/truckMake.model.js"

export async function getMakes(req,res){
    try {
        const truckMakes = await TruckMake.find({});
        return res.status(200).json(truckMakes);
    } catch (error) {
        console.log("Error in getMakes truck controller", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

export async function getModels(req,res){
    try {
        const truckModels = await TruckModel.find().populate("make");
        return res.status(200).json(truckModels);
    } catch (error) {
        console.log("Error in getModels truck controller", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

export async function getTrucks(req,res){
    try {
        const trucks = await Truck.find().populate("model");
        return res.status(200).json(trucks);
    } catch (error) {
        console.log("Error in getTrucks truck controller", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

export async function createMake(req,res){
    try {
        const {name, code} = req.body;

        if (!name || !code) {
            return res.status(400).json({message: "Missing fields, all field are required"})
        }

        const newMake = new TruckMake({name,code});
        await newMake.save();
        return res.status(201).json({message: "Successfully created new Truck Make"});
    } catch (error) {
        console.log("Error in createMake truck controller", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

export async function createModel(req,res){
    try {
        const {name, category, make} = req.body;
        if (!name || !category || !make) {
            return res.status(400).json({message: "Missing fields, all field are required"})
        }

        const selectedMake = await TruckMake.findOne({name: make});

        if (!selectedMake) {
            return res.status(400).json({message:"Invalid make"});
        }

        const newModel = new TruckModel({name,category,make:selectedMake._id});
        await newModel.save();
        return res.status(201).json({message: "Successfully created new Truck Model"});
    } catch (error) {
        console.log("Error in createModel truck controller", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

export async function createTruck(req,res){
    try {
        const {stockNo, chassisNo, fleetNo, registration, offlineDate, deliveryDate, truckColour, chassisColour, trimColour, model} = req.body;
        if (!stockNo || !chassisNo || !truckColour || !chassisColour || !trimColour || !model) {
            return res.status(400).json({message: "Missing required fields"})
        }

        const truck = new Truck({stockNo, chassis:chassisNo, fleetNo, registration, offlineDate, deliveryDate, truckColour, chassisColour, trimColour, model});
        await truck.save();
        return res.status(201).json({message: "Successfully created new Truck"});
    } catch (error) {
        console.log("Error in createTruck truck controller", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};