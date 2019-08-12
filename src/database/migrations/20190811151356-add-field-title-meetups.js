module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('meetups', 'title', Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('meetups', 'title', Sequelize.STRING);
  },
};
