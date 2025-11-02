import User from "../models/user.model.js";

export async function updateProfile(req,res){
    try {
        const allowedFields = ["name", "email", "phone", "profilePicture"];
        const updatedData = {};

        for (const field of allowedFields){
            if (req.body[field]){
                updatedData[field] = req.body[field];
            }
        }

        // Update user
        const user = await User.findByIdAndUpdate(req.user._id, {$set: updatedData}, {new:true}).select("-password");
        res.json(user);

    } catch (error) {
        console.log("Error in updateProfile user controller:", error.message);
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}

export async function getTechnicians(req, res) {
    try {
        const technicians = await User.find({ role: 'technician' })
            .select('name email phone')
            .lean();
        res.json(technicians);
    } catch (error) {
        console.log("Error in getTechnicians user controller:", error.message);
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}