
const request = require('supertest');
const app = require('./app'); // Exportar tu app en app.js
const { sequelize } = require('./models/database'); // Asegurar de que la ruta sea correcta

beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reinicia la base de datos antes de las pruebas
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
                fullName: "Luis Torres",
                email: "cuenta1@gmail.com",
                password: "micuenta"
            });
        
        expect(response.status).toBe(201);
        expect(response.body.status).toBe('success');
        
    });

    it('should login the user and return a token', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: "cuenta1@gmail.cocm",
                password: "micuenta"
            });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });
        it('should deny access to protected route without token', async () => {
        const response = await request(app)
            .get('/api/users')
            .set('Authorization', token);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(Array.isArray(response.body.data)).toBe(true);
    });
    it('should get a user by id', async () => {
        const response = await request(app)
            .get('/api/users/{id}')
            .set('Authorization', token);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data).toHaveProperty('id', 1);
    });

    it('should update a user by id', async () => {
        const response = await request(app)
            .put('/api/users/{id}')
            .set('Authorization', token)
            .send({
                fullName: "Luis Torres Updated",
                email: "cuenta1@gmail.com"
    });
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data).toHaveProperty('fullName', '');
        expect(response.body.data).toHaveProperty('email', '');
    });

    it('should delete a user by id', async () => {
        const response = await request(app)
            .delete('/api/users/{id}')
            .set('Authorization', token);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
    });
});