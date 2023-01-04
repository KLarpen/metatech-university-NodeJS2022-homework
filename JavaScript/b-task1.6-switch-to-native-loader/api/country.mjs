const diContainer = async ({ console, db, common}) => {
  // Service code starts from here
  const country = db('country');

  return ({
    read(id) {
      console.log({ db });
      return country.read(id);
    },

    find(mask) {
      const sql = 'SELECT * from country where name like $1';
      return country.query(sql, [mask]);
    },
  });
  // Service code ends there
};

export default diContainer;
