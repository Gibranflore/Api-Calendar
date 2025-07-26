/*
    Rutas de Usuarios / Auth
    Host api/auth
 */

import {Router} from 'express'
import {check} from 'express-validator'

import { crearUsuario, revalidarToken, loginRegister } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJwt } from '../middlewares/validar-jwt.js';

const router = Router()

router.post('/new', [ 
    check('name', 'El nombre es obligatorio').not().isEmpty(), 
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener minimo 6 caracteres').isLength({min: 6}), 
    validarCampos
    ], crearUsuario)

router.post('/', [
    check('email', 'Debe de tener un @ para que sea valido').isEmail(),
    check('password', 'El password debe tener min 6 caracteres ').isLength({min: 6})
] , loginRegister)

router.get('/renew',validarJwt, revalidarToken)

export default router