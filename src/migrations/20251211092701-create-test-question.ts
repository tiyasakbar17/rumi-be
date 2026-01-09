import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('test_questions', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      testId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tests',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      questionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'questions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      orderInTest: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      section: {
        type: DataTypes.ENUM('listening', 'structure', 'reading'),
        allowNull: false,
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

    await queryInterface.addIndex('test_questions', ['testId', 'questionId'], {
      unique: true,
      name: 'test_questions_testId_questionId_unique',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('test_questions');
  },
};
