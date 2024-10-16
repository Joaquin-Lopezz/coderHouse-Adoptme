import mongoose from 'mongoose';
import CustomError from '../services/errors/custom-error.js';
import { EErrors } from '../services/errors/enum.js';
import { usersService } from '../services/index.js';

const getAllUsers = async (req, res, next) => {
    try {
        const users = await usersService.getAll();
        res.send({ status: 'success', payload: users });
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const userId = req.params.uid;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw CustomError.crearError({
                nombre: 'ID inválido',
                causa: `El ID proporcionado (${userId}) no es un ObjectId válido`,
                mensaje: 'Error al intentar buscar un usuario',
                codigo: EErrors.BAD_REQUEST,
            });
        }
        const user = await usersService.getUserById(userId);
        if (!user) {
            throw CustomError.crearError({
                nombre: 'usuario no encontrado',
                causa: `no existe un usuario con ID: ${userId}`,
                mensaje: 'Error al intentar encontraar un usuario',
                codigo: EErrors.NOT_FOUND,
            });
        }

        res.send({ status: 'success', payload: user });
    } catch (error) {
        
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const updateBody = req.body;
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user)
            throw CustomError.crearError({
                nombre: 'usuario no encontrado',
                causa: `no existe un usuario con ID: ${userId}`,
                mensaje: 'Error al intentar encontraar un usuario',
                codigo: EErrors.NOT_FOUND,
            });
        const result = await usersService.update(userId, updateBody);
        res.send({ status: 'success', message: 'User updated' });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.uid;
        const result = await usersService.getUserById(userId);
        res.send({ status: 'success', message: 'User deleted' });
    } catch (error) {
        next(error);
    }
};

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
};
