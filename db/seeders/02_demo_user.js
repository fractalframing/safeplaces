'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
     let password = await bcrypt.hash('admin', 5);
     const organizations = await queryInterface.sequelize.query(
      `SELECT id from Organizations;`
    );
    const organizationRows = organizations[0];

    return queryInterface.bulkInsert('Users', [{
      id: uuidv4(),
      username: 'admin',
      password: password,
      email: 'admin@org.com',
      maps_api_key: 'maps_api_key',
      UserOrganizationId: organizationRows[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
