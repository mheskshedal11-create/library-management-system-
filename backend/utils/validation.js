import joi from 'joi'

export const authValidation = joi.object({
    fullName: joi.string()
        .required()
        .trim()
        .min(3)
        .max(50)
        .messages({
            'string.empty': 'Full name is required',
            'string.min': 'Full name must be at least 3 characters',
            'string.max': 'Full name must not exceed 50 characters'
        }),

    email: joi.string()
        .email()
        .required()
        .lowercase()
        .trim()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address'
        }),

    password: joi.string()
        .required()
        .min(6)
        .max(20)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,20}$/)
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters',
            'string.max': 'Password must not exceed 20 characters',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&#)'
        }),

    phoneNumber: joi.string()
        .required()
        .trim()
        .pattern(/^[0-9]{10}$/)
        .messages({
            'string.empty': 'Phone number is required',
            'string.pattern.base': 'Phone number must be exactly 10 digits'
        }),

    address: joi.string()
        .required()
        .trim()
        .min(5)
        .max(200)
        .messages({
            'string.empty': 'Address is required',
            'string.min': 'Address must be at least 5 characters',
            'string.max': 'Address must not exceed 200 characters'
        }),

    role: joi.string()
        .valid('student', 'admin', 'librarian')
        .default('student')
        .messages({
            'any.only': 'Role must be either student, admin, or librarian'
        })
})