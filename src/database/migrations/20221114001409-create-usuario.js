'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER, // numero
        primaryKey: true, //key primeira
        autoIncrement: true, //adiciona o id automatico
        allowNull: false, //nao pode ser nulo
      },
      nome: {
        type: Sequelize.STRING(70), //letra
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(120),
        allowNull: false,
        unique: true,
      },
      login: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      senha_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios')
  },
}
