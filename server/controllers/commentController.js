
import { Comment } from "../models/commentModel.js";

export const commentAdd = async(req,res)=>{
    try {
         const {comment} = req.body;
         if (!comment) {
            return res.status(400).json({
                status:false,
                message:"Commment required"
            })
         } 
         const addComment = await Comment.create({
            postId: req.params.postId,userId:req.user._id,comment
         }) 

         return res.status(201).json({
        status:true,
        message:"comment add successfully",
        data:addComment
         })
    } catch (error) {
         return res.status(400).json({
                status:false,
                message:"Commment add error",
                error:error.message
            })
    }
}

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).populate("userId", "name avatar").sort({ createdAt: -1 });
    return res.status(200).json({ status: true, data: comments });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};