import User from "../model/auth.model.js";
import { ErrorHandler } from "../utils/errorHander.js";
import { SuccessHandler } from "../utils/successHandler.js";
import { authValidation } from "../utils/validation.js";
import bcrypt from 'bcrypt';
import fs from 'fs';

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

        const profilePath = req.file ? `/uploads/${req.file.filename}` : '';
        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            fullName,
            email,
            password: hashPassword,
            phoneNumber,
            address,
            profileImage: profilePath,
            role: role || 'student'
        });

        await newUser.save();

        const userResponse = { ...newUser._doc };
        delete userResponse.password;
        SuccessHandler(res, 'User registered successfully', 201, userResponse);
    } catch (error) {
        next(error);
    }
};
