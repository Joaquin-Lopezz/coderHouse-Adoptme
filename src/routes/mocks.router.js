import { response, Router } from 'express';
import { generarMascotas, generarUsuarios } from '../utils/mock.js';
import { petsService, usersService } from '../services/index.js';

export const mocksRouter = Router();

mocksRouter.get('/mockingpets', (req, res) => {
    const mascotas = [];
    for (let i = 0; i < 100; i++) {
        mascotas.push(generarMascotas());
    }

    res.json(mascotas);
});

mocksRouter.get('/mockingUsers', async (req, res, next) => {
    try {
        const usuarios = [];
        for (let i = 0; i < 100; i++) {
            usuarios.push(await generarUsuarios());
        }

        res.json(usuarios);
    } catch (error) {
        next(error);
    }
});

mocksRouter.post('/generateData', async (req, res, next) => {
    try {
        const { users, pets } = req.body;
        for (let i = 0; i < users; i++) {
            const usuario = await generarUsuarios();
            await usersService.create(usuario);
        }

        for (let i = 0; i < pets; i++) {
            const mascota = generarMascotas();
            await petsService.create(mascota);
        }
        res.send({ status: 'success' });
    } catch (error) {
        next(error);
    }
});

/*desarrollar un endpoint POST llamado 
/generateData que reciba los parámetros numéricos “users” y “pets” para generar 
e insertar en la base de datos la cantidad de registros indicados.
Comprobar dichos registros insertados mediante los servicios GET de users y pets
 */
