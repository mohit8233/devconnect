import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const authMiddle = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization;
        if (!authToken || !authToken.startsWith("Bearer ")) {
            return res.status(401).json({
                status: false,
                message: "token not found"
            })
        }
        const token = authToken.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT)
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "user not found"
            })
        }
        if (user.isBlocked) {
            return res.status(401).json({
                status: false,
                message: "Account blocked"
            })
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ status: false, message: "Invalid token" });

    }
}