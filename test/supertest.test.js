import supertest from 'supertest';
import { expect } from 'chai';

const requester = supertest('http://localhost:8080');

//modificar la base datos antes de entregar

describe('Testing Adoptme', () => {
    let adoptionId;
    let idUser;
    let idPet;

    describe('create Adoption:', function () {
        this.timeout(5000);
        it('create Adoption', async () => {
            const { body } = await requester
                .post('/api/mocks/generateData')
                .send({ users: 1, pets: 1 });

            idUser = body.users[0]._id;
            idPet = body.pets[0]._id;

            const response = await requester.post(
                `/api/adoptions/${body.users[0]._id}/${body.pets[0]._id}`
            );
            expect(response.status).to.equal(200);
        });

        it('user Id invalid', async () => {
            const response = await requester.post(
                `/api/adoptions/afadsfdafdf/11111111111a06105efc4152`
            );
            expect(response.status).to.equal(400);
        });

        it('pet Id invalid', async () => {
            const response = await requester.post(
                `/api/adoptions/11111111111a06105efc4152/aaaaaaaaa`
            );
            expect(response.status).to.equal(400);
        });

        it('user Id Not Found', async () => {
            const response = await requester.post(
                `/api/adoptions/11111111111a06105efc4152/11111111111a06105efc4152`
            );
            expect(response.status).to.equal(404);
        });

        it('pet Id Not Found', async () => {
            const response = await requester.post(
                `/api/adoptions/${idUser}/11111111111a06105efc4152`
            );
            expect(response.status).to.equal(404);
        });
    });

    describe('Get adoptions:', () => {
        it('get adoptions', async () => {
            const response = await requester.get('/api/adoptions');
            adoptionId = response.body.payload[0]._id;
            expect(response.status).to.equal(200);
        });
    });

    describe('Get adoptions by Id:', () => {
        it('Id invalid', async () => {
            const response = await requester.get(`/api/adoptions/afadsfdafdf`);
            expect(response.status).to.equal(400);
        });
        it('adoption Id Not Found', async () => {
            const response = await requester.get(
                '/api/adoptions/11111111111a06105efc4152'
            );
            expect(response.status).to.equal(404);
        });
        it('get adoption', async () => {
            const response = await requester.get(
                `/api/adoptions/${adoptionId}`
            );
            expect(response.status).to.equal(200);
        });
    });
});
