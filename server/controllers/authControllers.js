import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "All feildsn are required"
            })
        }
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({
                status: false,
                message: "User already registered"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name, email, password: hashPassword
        })

        return res.status(201).json({
            status: true,
            message: "user register successfully",
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            message: " error in user register ",
            error: error.message
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password are required"
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                status: false,
                message: "user not exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
               return res.status(400).json({
            status: false,
            message: "Email and Password are Invaild "
        })
        }
      
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT, { expiresIn: "7d" });
        return res.status(200).json({
            status: true,
            message: "user login successfully",
            token
        })
    } catch (error) {
        return res.status(400).json({
            message: " error in user login ",
            error: error.message
        })
    }
}


export const userProflle = (req, res) => {
    return res.status(200).json({ status: true, data: req.user })
}

export const updateProfile = async (req, res) => {
    try {
        const { name, bio, skills, github, linkedin, portfolio, avatar } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, bio, skills, github, linkedin, portfolio, avatar },
            { new: true }).select("-password");

        return res.status(200).json({
            status: true,
            message: "Profile updated",
            data: user
        });

    } catch (error) {
       return res.status(200).json({
         status: false, message: "Error in Profile updating", error: error.message });
    }
}
