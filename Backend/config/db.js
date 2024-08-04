import mongoose from "mongoose";

const DbCon=async()=>{
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log('Mongodb is connected')
        
    } catch (error) {
        console.log("Error in mongodb connection",error)
    }
}
export default DbCon