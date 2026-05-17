import { Post } from "../models/postModel.js";

export const createPost = async (req, res) => {
    try {
        const { title, description, techStack, image, githubLink, liveLink } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                status: false,
                message: "Title and Description are required"
            })

        }
        const post = await Post.create({
            userId: req.user._id,
            title,
            description,
            techStack,
            image,
            githubLink,
            liveLink

        })

        return res.status(201).json({
            status: true,
            message: "Post has been added",
            data: post
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: `Error in add post ${error.message}`
        })
    }
}

export const bulkUploadPost = async (req, res) => {
    try {
        const posts = req.body;

        if (!Array.isArray(posts)) {
            return res.status(400).json({
                status: false,
                message: "Data must be an array"
            });
        }

        const updatedPosts = posts.map((post) => ({
            ...post,
            userId: req.user._id
        }));

        const postResult = await Post.insertMany(updatedPosts);

        return res.status(201).json({
            status: true,
            message: "Posts added successfully",
            data: postResult
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error in adding multiple post ${error.message}`
        });
    }
};

export const getAllPost = async (req, res) => {
    try {
        const post = await Post.find().populate("userId", "name avatar bio").sort({ createdAt: -1 })

        return res.status(200).json({
            status: true,
            message: "All post fetched successfully",
            data: post
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: `Error in get post ${error.message}`
        })
    }
}


export const getMyPost = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.user._id }).sort({ createdAt: -1 })
        return res.status(200).json({
            status: true,
            message: "All my post fetched",
            data: posts
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: " Error in All my post fetched",
            error: error.message
        })
    }
}

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(400).json({
                status: false,
                message: "post not found"
            })
        }

        const liked = post.likes.includes(req.user._id)
        const updatedPosts = await Post.findByIdAndUpdate(id, liked ? { $pull: { likes: req.user._id } } : { $addToSet: { likes: req.user._id } })
        return res.status(200).json({
            status: true,
            message: liked ? "Unliked" : "Liked"
        });

    } catch (error) {
    return res.status(400).json({
         status: false,
          message:`Error in liked post ${error.message}` 
        });

    }
}


export const deletePost = async(req,res)=>{
    try {
         const {id} = req.params;
        const post = await Post.findById(id);
         if (!post) {
            return res.status(400).json({
                status: false,
                message: "post not found"
            })
        }

    if (post.userId.toString() !== req.user._id.toString()) return res.status(403).json({ status: false, message: "Not allowed" });
      const deleteposts = await Post.findByIdAndDelete(id);
      return res.status(200).json({
        status:true,
        message:"user deleted successfully",
        data:deleteposts
      }) 
    } catch (error) {
        return res.status(400).json({
            status:true,
            message:`Error in deleting post ${error.message}`
        })
    }
}