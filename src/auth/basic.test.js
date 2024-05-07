'use strict';

const httpMocks = require('node-mocks-http');
jest.mock('./models/users-model');

const basicAuth = require('./middleware/basic');
const { Users } = require('./models/users-model');

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
});
