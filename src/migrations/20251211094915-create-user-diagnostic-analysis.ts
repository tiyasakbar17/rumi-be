import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('user_diagnostic_analyses', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      lastDiagnosticTestId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'test_results',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      lastDiagnosticScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      lastDiagnosticDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      strongAreas: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      weakAreas: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      improvementTrend: {
        type: DataTypes.ENUM('improving', 'stable', 'declining'),
        allowNull: true,
      },
      scoreTrend: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      recommendedFocus: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.addIndex('user_diagnostic_analyses', ['userId'], {
      unique: true,
      name: 'user_diagnostic_analyses_userId_unique',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('user_diagnostic_analyses');
  },
};
