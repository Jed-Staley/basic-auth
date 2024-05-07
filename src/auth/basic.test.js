'use strict';

const basicAuth = require('./middleware/basic');
const { Users } = require('./models/users-model');
const httpMocks = require('node-mocks-http');

jest.mock('./models/users-model');

describe('Basic Auth Middleware', () => {
  it('should authenticate a user with valid credentials', async () => {
    const req = httpMocks.createRequest({
      headers: {
        authorization: 'Basic ' + Buffer.from('testuser:testpassword').toString('base64'),
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    
    Users.authenticateBasic = jest.fn().mockResolvedValue({ username: 'testuser' });
    
    await basicAuth(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
    expect(req.user.username).toBe('testuser');
  });

  it('should fail with invalid credentials', async () => {
    const req = httpMocks.createRequest({
      headers: {
        authorization: 'Basic ' + Buffer.from('testuser:wrongpassword').toString('base64'),
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    Users.authenticateBasic = jest.fn().mockRejectedValue(new Error('Invalid credentials'));

    await basicAuth(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(403);
  });
});