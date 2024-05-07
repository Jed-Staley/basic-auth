'use strict';

const basicAuth = require('../middleware/basic');
const { Users } = require('../models/users-model');
const httpMocks = require('node-mocks-http');

jest.mock('../models/users-model', () => ({
  authenticateBasic: jest.fn(),
}));

describe('Basic Auth Middleware', () => {
  it('should authenticate a user with valid credentials', async () => {
    const req = httpMocks.createRequest({
      headers: {
        authorization: 'Basic dGVzdHVzZXI6dGVzdHBhc3M=',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    Users.authenticateBasic.mockResolvedValue({ username: 'testuser' });

    await basicAuth(req, res, next);
    expect(req.user).toBeDefined();
    expect(req.user.username).toBe('testuser');
    expect(next).toHaveBeenCalledWith();
  });

  it('should return an error with invalid credentials', async () => {
    const req = httpMocks.createRequest({
      headers: {
        authorization: 'Basic invalid',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    Users.authenticateBasic.mockRejectedValue(new Error('Invalid credentials'));

    await basicAuth(req, res, next);
    expect(res.statusCode).toBe(403);
    expect(res._getData()).toBe('Invalid Login');
    expect(next).not.toHaveBeenCalled();
  });
});