'use strict';

const fastify = require('fastify')({ logger: false });
const cors = require('@fastify/cors');

module.exports = (routing, port, { console, allowedClientOrigins }) => {

  // Handle CORS headers & OPTIONS preflight requests (the route will be registered by plugin)
  fastify.register(cors, {
    origin: allowedClientOrigins.map(item => `http://${item.host}:${item.port}`),
    methods: 'POST,OPTIONS',
    allowedHeaders: 'Content-Type,Content-Length',
    maxAge: 60, // 1 min of options caching
  });

  const handlerFactory = function (serviceHandler) {
    return async function (req, reply) {
      const { args } = req.body;
      console.log(`${req.socket.remoteAddress} ${req.method} ${req.url}`);
      try {
        const result = await serviceHandler(...args);
        reply.code(200);
        return result;
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
  };

  // Scaffold API services structure on Fastify's routes
  const serviceNames = Object.keys(routing);
  for (const name of serviceNames) {
    const entity = routing[name];
    const methods = Object.keys(entity);
    for (const method of methods) {
      // Do not expose restricted internal service methods, e.g. `query`
      if ('query' === method) continue;

      let url = `/api/${name}/${method}`;
      const serviceHandler = entity[method];
      fastify.route({
        url,
        method: 'POST',
        handler: handlerFactory(serviceHandler)
      });
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
