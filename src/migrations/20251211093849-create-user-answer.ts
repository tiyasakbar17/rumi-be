import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('user_answers', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      testSessionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'test_sessions',
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
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      selectedOption: {
        type: DataTypes.ENUM('A', 'B', 'C', 'D'),
        allowNull: true,
      },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      timeTaken: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      submittedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.addIndex('user_answers', ['testSessionId'], {
      name: 'user_answers_testSessionId_index',
    });

    await queryInterface.addIndex('user_answers', ['questionId'], {
      name: 'user_answers_questionId_index',
    });

    await queryInterface.addIndex('user_answers', ['userId'], {
      name: 'user_answers_userId_index',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('user_answers');
  },
};
