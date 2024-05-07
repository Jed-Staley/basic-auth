'use strict';

const handler = require('../src/handlers/404');
const httpMocks = require('node-mocks-http');

describe('404 Error Handler', () => {
  it('should respond with 404', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    handler(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._getData()).toBe('Not Found');
  });
});