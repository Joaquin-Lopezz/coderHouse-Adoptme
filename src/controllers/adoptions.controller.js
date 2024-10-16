import CustomError from '../services/errors/custom-error.js';
import { EErrors } from '../services/errors/enum.js';
import {
    adoptionsService,
    petsService,
    usersService,
} from '../services/index.js';

const getAllAdoptions = async (req, res) => {
    try {
        const result = await adoptionsService.getAll();
        res.send({ status: 'success', payload: result });
    } catch (error) {
        next(error);
    }
};

const getAdoption = async (req, res) => {
    try {
        const adoptionId = req.params.aid;
        const adoption = await adoptionsService.getBy({ _id: adoptionId });
        if (!adoption)
            throw CustomError.crearError({
                nombre: 'error al obtener adopcion',
                causa: `no hay una adopcion registrada con ${adoptionId}`,
                mensaje: 'error al obtener adopcion',
                codigo: EErrors.NOT_FOUND,
            });

        res.send({ status: 'success', payload: adoption });
    } catch (error) {
        next(error);
    }
};

const createAdoption = async (req, res) => {
    try {
        const { uid, pid } = req.params;
        const user = await usersService.getUserById(uid);
        if (!user)
            throw CustomError.crearError({
                nombre: 'usuario no encontrado',
                causa: `no existe usuario con el mail :'${uid}' `,
                mensaje: 'error en crear adopcion',
                codigo: EErrors.NOT_FOUND,
            });
        const pet = await petsService.getBy({ _id: pid });
        if (!pet)
            throw CustomError.crearError({
                nombre: 'mascota no encontrado',
                causa: `no existe mascota con el id :'${pid}' `,
                mensaje: 'error al  encontrar  mascota',
                codigo: EErrors.NOT_FOUND,
            });
        if (pet.adopted) {
            throw CustomError.crearError({
                nombre: 'mascota adoptada',
                causa: `la mascota ya fue adoptada :'${pet}' `,
                mensaje: 'la mascota ya fue adoptada ',
                codigo: EErrors.CONFLICT,
            });
            s;
        }
        user.pets.push(pet._id);
        await usersService.update(user._id, { pets: user.pets });
        await petsService.update(pet._id, { adopted: true, owner: user._id });
        await adoptionsService.create({ owner: user._id, pet: pet._id });
        res.send({ status: 'success', message: 'Pet adopted' });
    } catch (error) {
        next(error);
    }
};

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption,
};