'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("regioes", { 
      id: {
        type: Sequelize.INTEGER ,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }, 
      servico_id: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        references: {model: 'servicos', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable("regioes");
  },
};
