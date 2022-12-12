const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'usuarios',
      [
        {
          nome: 'Administrador',
          email: 'admin@admin.com.br',
          login: 'admin',
          senha_hash: await bcrypt.hash('admin', 8),
          ativo: true,
          is_admin: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'usuarios',
      {
        email: 'admin@admin.com.br',
      },
      {}
    )
  },
}
