
const request = require('supertest');
const app = require('./routes/userRoutes'); // Exportar tu app en app.js
const { sequelize } = require('./models/database'); // Asegurar de que la ruta sea correcta
const e = require('express');

beforeAll(async () => {
    await sequelize.sync(); // Reinicia la base de datos antes de las pruebas
});

afterAll(async () => {
    await sequelize.close();
});

describe('Auth API', () => {
    let token;
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                fullName: "Pepe Martines", email: "micuentar5r@gmail.com", password: "micuenta1234"
            }, 10000);
        expect(response.status).toBe(201);
        expect(response.body.status).toBe('success');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data).toHaveProperty('fullName');
        expect(response.body.data).toHaveProperty('email');

    });

    it('should login the user and return a token', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: "micuentar4@gmail.com",
                password: "micuenta1234"
            });
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });
        it('should get all users', async () => {
        const response = await request(app)
            .get('/api/users')
            .set('Authorization', `bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(Array.isArray(response.body.data)).toBe(true);
    });
    it('should get a user by id', async () => {
        const id_user = 13; // Asegúrate de que este ID exista en la base de datos
        const response = await request(app)
            .get('/api/users'+id_user)
            .set('Authorization', `bearer ${token}`);
            
        expect(response.status).toBe(200);
        console.log(response.body);
    });
    it("should create a new user", async () => {
        const response = await request(app)
            .post("/api/users")
            .set("Authorization", `Bearer ${token}`)
            .send({ 
                fullName: "Jane Doe lol", 
                email: "jane.hola@gmail.com", 
                password: "pass123" });

        expect(response.statusCode).toBe(201);
        console.log(response.body);
    });
    it('should update a user by id', async () => {
        const response = await request(app)
            .put('/api/users/13')
            .set('Authorization', `bearer ${token}`)
            .send({
                fullName: "Pepe Martines torres",
                email: "micuentar4r@gmail.com"
        });
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data).toHaveProperty('fullName');
        expect(response.body.data).toHaveProperty('email');
    });

    it('should delete a user by id', async () => {
        const id_toDelete = 1; // Asegúrate de que este ID exista en la base de datos
        const response = await request(app)
            .delete('/api/users/'+id_toDelete)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(204);
        console.log(response.body);
        
    }, 50000);
});