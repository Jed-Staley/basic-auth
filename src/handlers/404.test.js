'use strict';

const handler404 = require('../src/handlers/404');
const httpMocks = require('node-mocks-http');

describe('404 Error Handler', () => {
  it('responds with 404 for non-existent routes', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    handler404(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._getData()).toBe('Not Found');
  });
});