import mongoose from 'mongoose'
export const connectDb = async()=>{
    try {
         await mongoose.connect(process.env.MONGO_URL);
         console.log("mongo connected successfully");
         
    } catch (error) {
         console.log(error.message);
         
    }
}