'use strict';

const scaffold = (url, structure) => {
  const api = {};
  const parsedURL = new URL(url)
  const protocol = parsedURL.protocol.slice(0, parsedURL.protocol.length - 1);
  const services = Object.keys(structure);
  console.log({protocol});

  /**
   * Collection of the factories for API request handlers.
   * Each factory receives API service/entity name, method for this service
   * and returns a function that makes proper API requests.
   */
  const transportHandlerFactory = {
    http: (serviceName, method) => (...args) => new Promise((resolve, reject) => {
      const body = JSON.stringify({ args });
      fetch(`${url}/api/${serviceName}/${method}`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json; charset=UTF-8',
          'Content-Length': Uint8Array.from(body).byteLength,
        },
        body,
      }).then(res => {
        if (res.ok && res.status === 200) resolve(res.json());
        else reject(new Error(
          `Status Code: ${res.status} ${res.statusText} (type: ${res.type})`
        ));
      }).catch(reject);
    }),
    ws: (serviceName, method, ws) => (...args) => new Promise((resolve) => {
      const packet = { name: serviceName, method, args };
      ws.send(JSON.stringify(packet));
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        resolve(data);
      };
    }),
  };

  /**
   * DRY sugar function that mutates `api` object by filling it with
   * API handlers for the provided services structure
   * @param {'http' | 'ws'} transport network transport protocol
   * @param {WebSocket | null} networkClient client that handles network request
   * (`ws` transport requires singleton WebSocket instance, otherwise currently unused)
   */
  const fillApi = (transport, networkClient) => {
    for (const serviceName of services) {
      api[serviceName] = {};
      const service = structure[serviceName];
      const methods = Object.keys(service);
      for (const methodName of methods) {
        api[serviceName][methodName] = transportHandlerFactory[transport](
          serviceName,
          methodName,
          networkClient
        );
      }
    }
  };

  if(protocol === 'ws') {
    const socket = new WebSocket(url);
    fillApi(protocol, socket);
  } else fillApi(protocol, null);


  return api;
};

const api = scaffold('http://127.0.0.1:8001', {
  user: {
    create: ['record'],
    read: ['id'],
    update: ['id', 'record'],
    delete: ['id'],
    find: ['mask'],
  },
  country: {
    read: ['id'],
    delete: ['id'],
    find: ['mask'],
  },
});
