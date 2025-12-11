import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('test_sessions', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
      sessionStatus: {
        type: DataTypes.ENUM('started', 'in_progress', 'submitted', 'graded'),
        defaultValue: 'started',
      },
      startedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      submittedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      completionTimeSeconds: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      currentSection: {
        type: DataTypes.ENUM('listening', 'structure', 'reading', 'completed'),
        defaultValue: 'listening',
      },
      lastActivityAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      randomizedAnswerOrder: {
        type: DataTypes.JSON,
        defaultValue: {},
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

    await queryInterface.addIndex('test_sessions', ['userId'], {
      name: 'test_sessions_userId_index',
    });

    await queryInterface.addIndex('test_sessions', ['testId'], {
      name: 'test_sessions_testId_index',
    });

    await queryInterface.addIndex('test_sessions', ['sessionStatus'], {
      name: 'test_sessions_sessionStatus_index',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('test_sessions');
  },
};
