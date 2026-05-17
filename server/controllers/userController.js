import { User } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.status(200).json({ status: true, data: users });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password").populate("followers", "name avatar").populate("following", "name avatar");
    if (!user) return res.status(404).json({ status: false, message: "User not found" });
    return res.status(200).json({ status: true, data: user });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const followUser = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) return res.status(400).json({ status: false, message: "You cannot follow yourself" });
    await User.findByIdAndUpdate(req.params.id, { $addToSet: { followers: req.user._id } });
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { following: req.params.id } });
    return res.status(200).json({ status: true, message: "Followed" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { $pull: { followers: req.user._id } });
    await User.findByIdAndUpdate(req.user._id, { $pull: { following: req.params.id } });
    return res.status(200).json({ status: true, message: "Unfollowed" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
