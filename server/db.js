import { connect } from "mongoose";

export const connectToDatabase=async ()=>{
    try{
    await connect(process.env.MONGOURL)
    console.log("Connected to database..")
    }catch(error){
        console.log("Cannot connect to database",error.message)
    }
}