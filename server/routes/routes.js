import { Router } from "express";
import { login, register, updateProfile, userProflle } from "../controllers/authControllers.js";
import { authMiddle } from "../middleware/authMiddle.js";
import { bulkUploadPost, createPost, deletePost, getAllPost, getMyPost, likePost } from "../controllers/postController.js";
import { commentAdd, getComments } from "../controllers/commentController.js";

export const authRoutes = Router();
// ======AuthRoutes======//
authRoutes.post("/register",register)
authRoutes.post("/login",login)
authRoutes.get("/profile", authMiddle, userProflle)
authRoutes.patch("/updateProfile", authMiddle , updateProfile)

// ======PostRoutes======//

authRoutes.post("/create", authMiddle, createPost);
authRoutes.post("/bulk",authMiddle,bulkUploadPost)
authRoutes.get("/post",authMiddle,getAllPost)
authRoutes.get("/myPost", authMiddle, getMyPost)
authRoutes.patch("/like/:id", authMiddle, likePost)
authRoutes.delete("/delete/:id", authMiddle, deletePost)

// ======commentRoutes======//

authRoutes.post("/comment/:postId",authMiddle, commentAdd);
authRoutes.get("/get/:postId", authMiddle, getComments)