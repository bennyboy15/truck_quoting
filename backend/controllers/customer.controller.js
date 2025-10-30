import Customer from "../models/customer.model.js"

export async function getCustomers(req,res){
    try {
        const customers = await Customer.find();
        return res.status(200).json(customers);
    } catch (error) {
        console.log("Error in getCustomers customer controller", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}