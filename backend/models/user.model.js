import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        default: "",
    },
    profilePicture: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        enum: ["user", "admin"],  
        default: "user",          // Default role for new accounts
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;