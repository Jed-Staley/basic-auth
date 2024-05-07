'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelize } = require('../src/auth/models/index');

const request = supertest(app);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Authentication routes', () => {
  it('should create a new user on POST /signup', async () => {
    const response = await request.post('/signup').send({
      username: 'testuser',
      password: 'testpass',
    });
    expect(response.status).toBe(201);
    expect(response.body.username).toBe('testuser');
  });

  it('should sign in an existing user on POST /signin', async () => {
    const response = await request.post('/signin')
      .auth('testuser', 'testpass');
    expect(response.status).toBe(200);
    expect(response.body.username).toBe('testuser');
  });
});