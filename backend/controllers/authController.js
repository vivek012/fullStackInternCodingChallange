import bcrypt from 'bcrypt';
import { User } from "../models/index.js"
import generateToken from '../utils/generateToken.js';


export const register = async(req, res) => {
    try {
        const { name, email, password, address } = req.body
        
        if (!name, !email, !password, !address) {
            return res.status(400).json({
                message: "All Fields are required"
            })
        }

        const existingUser = await User.findOne({
            where: { email }
        })

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
            })
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must be 8-16 characters with one uppercase letter and one special character",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            role: "USER",
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user,
        });

        
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        
    }
}





export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        })

        if (!user) {
            return res.status(404).json({
                message: "Invalid Credentials",
            })
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        )

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Credentials",
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            message: "Login Successful",
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};