module.exports = {
  up: (queryInterface, Sequelize) => {
    // User hasOne Organization
    return queryInterface.addColumn(
      'Users', // name of Source model
      'UserOrganizationId', // name of the key we're adding 
      {
        type: Sequelize.UUID,
        references: {
          model: 'Organizations', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => {
      // Trail hasOne Organization
      return queryInterface.addColumn(
        'Trails', // name of Target model
        'organization_id', // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: 'Organizations', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    })
    .then(() => {
      // Trail hasOne User
      return queryInterface.addColumn(
        'Trails', // name of Target model
        'user_id', // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: 'Users', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    })
    .then(() => {
      // Trail hasOne Organization
      return queryInterface.addColumn(
        'Paths', // name of Target model
        'authority_id', // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: 'Organizations', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Users', // name of Source model
      'UserOrganizationId' // key we want to remove
    )
    .then(() => {
      return queryInterface.removeColumn(
        'Trails', // name of Source model
        'organization_id' // key we want to remove
      )
    })
    .then(() => {
      return queryInterface.removeColumn(
        'Trails', // name of Source model
        'user_id' // key we want to remove
      )
    })
    .then(() => {
      return queryInterface.removeColumn(
        'Paths', // name of Source model
        'authority_id' // key we want to remove
      )
    });
  }
};
