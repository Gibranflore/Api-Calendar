import response from 'express'
import bcrypt from 'bcryptjs';
import { Usuario } from '../models/Usuario.js';
import { generarJwt } from '../helpers/jwt.js';


export const crearUsuario = async(req,res = response) => {

    const { email, password} = req.body;
    
    try {
        
        let usuario = await Usuario.findOne({ email });
        
            if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Alguien ya se registró con ese correo"
            });
        }

        usuario = new Usuario(req.body);

        //^ Encriptar constraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt )
    
        await usuario.save();

        //^ Generar jwt
        const token = await generarJwt(usuario.id, usuario.name)
        
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            ok: false,
            msg: "Error esos datos ya fueron usados"
        })
        
    }

    // if ( name.length < 5) {
    //     return res.status(400).json({
    //         ok: false,
    //         msg: "El nombre debe tener mas de 3 letras"
    //     })
    // }
    
};

export const loginRegister = async(req,res = response) => {

    const {email, password} = req.body;

    try {

        const usuario = await Usuario.findOne({ email });
        
            if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe con ese email"
            });
        }
        //Consfirmar las passwords
        const validPassword = bcrypt.compareSync( password, usuario.password);

        if ( !validPassword) {
            return res.status(400).json ({
                ok: false,
                msg: "password es incorrecto"
            });
        }

        //^ EL login del token
        const token = await generarJwt(usuario.id, usuario.name)

        //Generar nuesto web token JWTs
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            ok: false,
            msg: "Error esos datos ya fueron usados"
        })
        
    }

};

export const revalidarToken = async(req,res = response) => {

    const {uid, name} = req

    const token = await generarJwt(uid, name)

    res.json({
        ok: true,
        uid,
        name,
        token
    })
    
};