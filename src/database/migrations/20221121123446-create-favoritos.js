'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('favoritos', {
      id: {
        type: Sequelize.INTEGER, // numero
        primaryKey: true, //key primeira
        autoIncrement: true, //adiciona o id automatico
        allowNull: false, //nao pode ser nulo
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }, //FAZ UMA REFERENCIA COM A OUTRA TABELA (chave estrangeira)
        onUpdate: 'CASCADE', //SE ATUALIZAR O ID ELE ATUALIZA TBM
        onDelete: 'CASCADE', //SE FOR DELETADO O ID ELE DELETADA TBM
      },
      video_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'videos', key: 'id' }, //FAZ UMA REFERENCIA COM A OUTRA TABELA (chave estrangeira)
        onUpdate: 'CASCADE', //SE ATUALIZAR O ID ELE ATUALIZA TBM
        onDelete: 'CASCADE', //SE FOR DELETADO O ID ELE DELETADA TBM
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
    await queryInterface.dropTable('favoritos')
  },
}
