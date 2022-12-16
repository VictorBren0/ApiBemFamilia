'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("servicos_oferecidos", { 
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
      clinica_id: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        references: {model: 'clinicas', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable("servicos_oferecidos");
  },
};
