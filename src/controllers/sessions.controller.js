import { usersService } from '../services/index.js';
import { createHash, passwordValidation } from '../utils/index.js';
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';
import CustomError from '../services/errors/custom-error.js';
import { EErrors } from '../services/errors/enum.js';

const register = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            throw CustomError.crearError({
                nombre: 'datos faltantes',
                causa: `falta ${first_name},${last_name},${email} o ${password}`,
                mensaje: 'error al registrar usuario',
                codigo: EErrors.BAD_REQUEST,
            });
        }

        const exists = await usersService.getUserByEmail(email);
        if (exists) {
            throw CustomError.crearError({
                nombre: 'email existente',
                causa: `ya existe un usario registrado con ${email} `,
                mensaje: 'error al registrar usuario',
                codigo: EErrors.CONFLICT,
            });
        }
        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
        };
        let result = await usersService.create(user);
        res.send({ status: 'success', payload: result._id });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw CustomError.crearError({
                nombre: 'datos faltantes',
                causa: `falta el ${email} o ${password}`,
                mensaje: 'error en login',
                codigo: EErrors.BAD_REQUEST,
            });
        }
        const user = await usersService.getUserByEmail(email);
        if (!user)
            throw CustomError.crearError({
                nombre: 'usuario no encontrado',
                causa: `no existe usuario con el mail :'${email}' `,
                mensaje: 'error en login',
                codigo: EErrors.NOT_FOUND,
            });
        const isValidPassword = await passwordValidation(user, password);

        if (!isValidPassword)
            throw CustomError.crearError({
                nombre: 'error de password',
                causa: `password incorrecta' `,
                mensaje: 'la contraseña no es correcta',
                codigo: EErrors.Unauthorized,
            });

        const userDto = UserDTO.getUserTokenFrom(user);
        const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: '1h' });
        res.cookie('coderCookie', token, { maxAge: 3600000 }).send({
            status: 'success',
            message: 'Logged in',
        });
    } catch (error) {
        next(error);
    }
};

const current = async (req, res) => {
    try {
        const cookie = req.cookies['coderCookie'];
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        if (user) return res.send({ status: 'success', payload: user });
    } catch (error) {
        next(error);
    }
};

const unprotectedLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res
                .status(400)
                .send({ status: 'error', error: 'Incomplete values' });
        const user = await usersService.getUserByEmail(email);
        if (!user)
            return res
                .status(404)
                .send({ status: 'error', error: "User doesn't exist" });
        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword)
            return res
                .status(400)
                .send({ status: 'error', error: 'Incorrect password' });
        const token = jwt.sign(user, 'tokenSecretJWT', { expiresIn: '1h' });
        res.cookie('unprotectedCookie', token, { maxAge: 3600000 }).send({
            status: 'success',
            message: 'Unprotected Logged in',
        });
    } catch (error) {
        next(error);
    }
};
const unprotectedCurrent = async (req, res) => {
    try {
        const cookie = req.cookies['unprotectedCookie'];
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        if (user) return res.send({ status: 'success', payload: user });
    } catch (error) {
        next(error);
    }
};
export default {
    current,
    login,
    register,
    current,
    unprotectedLogin,
    unprotectedCurrent,
};
