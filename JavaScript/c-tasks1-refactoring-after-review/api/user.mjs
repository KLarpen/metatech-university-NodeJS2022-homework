const diContainer = async ({ console, db, common}) => {
  // Service code starts from here
  const users = db('users');
  return ({
    read(id) {
      return users.read(id, ['id', 'login']);
    },

    async create({ login, password }) {
      const passwordHash = await common.hash(password);
      return users.create({ login, password: passwordHash });
    },

    async update(id, { login, password }) {
      const passwordHash = await common.hash(password);
      return users.update(id, { login, password: passwordHash });
    },

    delete(id) {
      return users.delete(id);
    },

    find(mask) {
      const sql = 'SELECT login from users where login like $1';
      return users.query(sql, [mask]);
    },
  });
  // Service code ends there
};

export default diContainer;
