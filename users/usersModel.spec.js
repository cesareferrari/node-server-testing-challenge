const db = require('../data/db-config.js');
const Users = require('../users/usersModel.js');

describe('Users model', () => {
  beforeEach(async () => {
    await db('users').truncate();
  })

  describe('create()', () => {

    it('should insert one user', async () => {
      await Users.create({name: "Estelle", password: "secret"});

      const users = await db('users');
      expect(users).toHaveLength(1);
    })
  })


  describe('find()', () => {
    it('should find one user', async () => {
      await Users.create({name: "Estelle", password: "secret"});

      const [user] = await db('users').where({name: "Estelle"});

      const foundUser = await Users.find(user.id);

      expect(foundUser.name).toBe("Estelle");
    })
  })

  describe('destroy()', () => {
    it('should destroy one user', async () => {
      await Users.create({name: "Estelle", password: "secret"});
      const [user] = await db('users').where({name: "Estelle"});
      await Users.destroy(user.id);

      const users = await db('users');
      expect(users).toHaveLength(0);

      const deletedUser = await Users.find(user.id);
      expect(deletedUser).toBe(undefined);
    })
  })
});
