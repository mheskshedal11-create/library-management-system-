import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: 'profile.png'
    },
    role: {
        type: String,
        enum: ['student', 'admin', 'librarian'],
        default: 'student'
    }

}, { timestamps: true })
const User = mongoose.model("User", userSchema)
export default User