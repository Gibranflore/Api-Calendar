import {Schema, model} from "mongoose";

export const UsuarioSchema = new Schema({

    name: {
        type: String,
        require: true
    },

    email:{
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true

    }
    
});

export const Usuario = model("Usuario", UsuarioSchema);