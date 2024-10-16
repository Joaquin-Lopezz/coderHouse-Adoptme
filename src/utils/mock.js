import { faker } from '@faker-js/faker';
import { encryptPassword } from './encriptarPassword.js';

export function generarMascotas() {
    return {
        name: faker.person.firstName(),
        specie: faker.animal.type(),
        birthDate: faker.date.past(10),
        image: faker.image.url({ category: 'animals' }),
        adopted: false,
        owner: null,
    };
}

export async function generarUsuarios() {
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: await encryptPassword('coder123'), // Usar await aquí
        role: randomRole(),
    };
}

function randomRole() {
    return Math.random() < 0.5 ? 'user' : 'admin';
}
