import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('test_results', {
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
      testSessionId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'test_sessions',
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
      listeningRawScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      structureRawScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      readingRawScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      listeningScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      structureScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      readingScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      percentile: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      performanceLevel: {
        type: DataTypes.ENUM('beginner', 'intermediate', 'advanced', 'proficient'),
        allowNull: false,
      },
      strengths: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      weaknesses: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      recommendations: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      completedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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

    await queryInterface.addIndex('test_results', ['userId'], {
      name: 'test_results_userId_index',
    });

    await queryInterface.addIndex('test_results', ['totalScore'], {
      name: 'test_results_totalScore_index',
    });

    await queryInterface.addIndex('test_results', ['percentile'], {
      name: 'test_results_percentile_index',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('test_results');
  },
};
