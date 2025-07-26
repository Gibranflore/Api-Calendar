import response from 'express';
import jwt from 'jsonwebtoken'

export const validarJwt = ( req, res = response, next ) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(4001).json({
            ok:false,
            msg: 'no hay token en la aplicacion' 
        })
    }

        try {

            const {uid, name} = jwt.verify(
                token, process.env.SECRET_JWT_SEED
            );
            req.uid = uid,
            req.name = name
            
            
        } catch (error) {
            return res.status(401).json({
                ok: false,
                msg: 'token no valido'
            })
            
        }
        
        

    next()
    

}