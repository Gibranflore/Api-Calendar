import mongoose from "mongoose";

export const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.DB_Connection);

        console.log('DB online');
        
        
    } catch (error) {
        console.log(Error);
        throw new Error("Error en la base de datos");
        
    }
}
