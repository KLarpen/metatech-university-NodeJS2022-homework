'use strict';

const fastify = require('fastify')({ logger: false });
const console = require('../consoleProvider.js');
const clientPort = require('../config.js').SERVERS.static.port;

const describeOptions = function (_, reply) {
  reply
    .code(204)
    .headers({
      'Access-Control-Allow-Origin': `http://127.0.0.1:${clientPort}`,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Content-Length',
      'Access-Control-Max-Age': 60, // 1 min of options caching
    })
    .send();
};

const handlerFactory = function (serviceHandler, isSingularEntity, hasBodyArgs) {
  return async function (req, reply) {
    const args = [];
    if (isSingularEntity) args.push(req.params.id);
    if (hasBodyArgs) args.push(req.body);
    console.log(`${req.socket.remoteAddress} ${req.method} ${req.url}`);
    try {
      const result = await serviceHandler(...args);
      reply
        .code(200)
        // CORS header to allow the web client from different port to communicate with API
        .header('Access-Control-Allow-Origin', `http://127.0.0.1:${clientPort}`);
      return result.rows;
    } catch (err) {
      reply.header('Access-Control-Allow-Origin', `http://127.0.0.1:${clientPort}`);
      console.error(err);
      throw err;
    }
  };
};

module.exports = (routing, port) => {
  // Handle OPTIONS preflight request
  fastify.route({
    method: 'OPTIONS',
    url: '/*',
    handler: describeOptions,
  });

  // Scaffold API services structure on Fastify's routes
  const serviceNames = Object.keys(routing);
  for (const name of serviceNames) {
    const entity = routing[name];
    const methods = Object.keys(entity);
    for (const method of methods) {
      // Do not expose restricted internal service methods, e.g. `query`
      if ('query' === method) continue;

      let url = `/${name}/${method}`;
      const serviceHandler = entity[method];
      const src = serviceHandler.toString();
      const signature = src.substring(0, src.indexOf(')'));
      const isSingularEntity = signature.includes('(id');
      const hasBodyArgs = signature.includes('{') || signature.includes('(mask');
      const httpMethod = hasBodyArgs ? 'POST' : 'GET';

      if (isSingularEntity) {
        // Route for singular entity request
        fastify.route({
          url: `${url}/:id`,
          method: httpMethod,
          handler: handlerFactory(serviceHandler, isSingularEntity, hasBodyArgs)
        });
        if ('read' === method) {
          // Generic route to read list entities
          fastify.route({
            url,
            method: httpMethod,
            handler: handlerFactory(serviceHandler, false, hasBodyArgs)
          });
        }
      } else {
        fastify.route({
          url,
          method: httpMethod,
          handler: handlerFactory(serviceHandler, isSingularEntity, hasBodyArgs)
        });
      }
    }
  }



  fastify.listen({ port }, (err, _address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Fastify baked HTTP API on port ${port}`);
    console.log(fastify.printRoutes())
  });
};
