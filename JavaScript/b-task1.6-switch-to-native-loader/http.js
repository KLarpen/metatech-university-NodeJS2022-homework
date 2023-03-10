'use strict';

const http = require('node:http');
const console = require('./consoleProvider.js');
const clientPort = require('./config.js').SERVERS.static.port;

const receiveArgs = async (req) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  const contentType = req.headers['content-type'];
  let isJSON = false;
  if (typeof contentType === 'string')
    isJSON = contentType.includes('application/json');
  return isJSON ? JSON.parse(data) : String(data);
};

const describeOptions = (res) => {
  res.statusCode = 204;
  res.setHeader('Access-Control-Allow-Origin', `http://127.0.0.1:${clientPort}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length');
  res.setHeader('Access-Control-Max-Age', 60); // 1 min of options caching
  return res.end();
};

module.exports = (routing, port) => {
  http.createServer(async (req, res) => {
    const { url, socket, method: httpMethod } = req;
    // Resolve API request handler
    const [name, method, id] = url.substring(1).split('/');
    const entity = routing[name];
    if (!entity) return res.end('Not found');
    const handler = entity[method];
    if (!handler) return res.end('Not found');
    // Handle OPTIONS preflight request
    if (httpMethod === 'OPTIONS') return describeOptions(res);
    // Prepare data for API handler
    const src = handler.toString();
    const signature = src.substring(0, src.indexOf(')'));
    const args = [];
    if (signature.includes('(id')) args.push(id);
    if (signature.includes('{') || signature.includes('(mask'))
      args.push(await receiveArgs(req));
    console.log(`${socket.remoteAddress} ${method} ${url}`);
    const result = await handler(...args);
    // Construct final response
    const resultBody = JSON.stringify(result.rows);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    res.setHeader('Content-Length', Buffer.byteLength(resultBody));
    // CORS header to allow the web client from different port to communicate with API
    res.setHeader('Access-Control-Allow-Origin', `http://127.0.0.1:${clientPort}`)
    res.end(resultBody);
  }).listen(port);

  console.log(`HTTP API on port ${port}`);
};
