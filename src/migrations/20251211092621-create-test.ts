import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('tests', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      testName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      testType: {
        type: DataTypes.ENUM('full', 'diagnostic'),
        defaultValue: 'full',
      },
      totalDuration: {
        type: DataTypes.INTEGER,
        defaultValue: 150,
      },
      passingScore: {
        type: DataTypes.INTEGER,
        defaultValue: 450,
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.addIndex('tests', ['isPublished'], {
      name: 'tests_isPublished_index',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('tests');
  },
};
