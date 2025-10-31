import Customer from "../models/customer.model.js"

export async function getCustomers(req,res){
    try {
        const customers = await Customer.find();
        return res.status(200).json(customers);
    } catch (error) {
        console.log("Error in getCustomers customer controller", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

export async function createCustomer(req,res) {
    try {
        const {name, code, email, phone, address} = req.body;

        if (!name || !code || !email || !phone || !address) {
            return res.status(400).json({message: "Missing required fields"});
        };
        
        const existingCustomer = await Customer.findOne({name});
        if (existingCustomer) {
            return res.status(400).json({message: "Customer with this name already exists!"});
        };

        const newCustomer = new Customer({name, code, email, phone, address});

        await newCustomer.save()

        return res.status(200).json(newCustomer);
    } catch (error) {
        console.log("Error in createCustomer customer controller", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}