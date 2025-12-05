import User from "../model/auth.model.js";
import { ErrorHandler } from "../utils/errorHander.js";
import { SuccessHandler } from "../utils/successHandler.js";
import { authValidation } from "../utils/validation.js";
import uploadToCloudinary from "../utils/cloudinary.js";
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path'

export const registerController = async (req, res, next) => {
    try {
        const { error, value } = authValidation.validate(req.body);
        if (error) {
            if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return next(new ErrorHandler(error.details[0].message, 400));
        }

        const { fullName, email, password, phoneNumber, address, role } = value;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return next(new ErrorHandler('Email is already registered.', 400));
        }

        let profileImageUrl = '';
        if (req.file) {
            const cloudinaryResponse = await uploadToCloudinary(req.file.path);
            if (!cloudinaryResponse) {
                return next(new ErrorHandler('Failed to upload profile image', 500));
            }
            profileImageUrl = cloudinaryResponse.secure_url;
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            fullName,
            email,
            password: hashPassword,
            phoneNumber,
            address,
            profileImage: profileImageUrl,
            role: role || 'student'
        });

        await newUser.save();

        const userResponse = { ...newUser._doc };
        delete userResponse.password;
        SuccessHandler(res, 'User registered successfully', 201, userResponse);
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        next(error);
    }
};

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return next(new ErrorHandler('Both Field Required...........!', 400))
        }
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return next(new ErrorHandler('Invalid Email...', 400))
        }
        const hashPassword = await bcrypt.compare(password, existingUser.password)
        if (!hashPassword) {
            return next(new ErrorHandler('Invalid Password', 400))
        }
        new (SuccessHandler(res, 'Login Successfully', 201, { existingUser }))
    } catch (error) {
        console.log(error)
        next(error)
    }
}