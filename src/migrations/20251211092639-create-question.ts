import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('questions', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      section: {
        type: DataTypes.ENUM('listening', 'structure', 'reading'),
        allowNull: false,
      },
      questionNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      questionText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      audioUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      audioDuration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      passageText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      difficulty: {
        type: DataTypes.ENUM('easy', 'medium', 'hard'),
        defaultValue: 'medium',
      },
      options: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      explanation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      knowledgeType: {
        type: DataTypes.STRING,
        allowNull: true,
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
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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

    await queryInterface.addIndex('questions', ['section'], {
      name: 'questions_section_index',
    });

    await queryInterface.addIndex('questions', ['difficulty'], {
      name: 'questions_difficulty_index',
    });

    await queryInterface.addIndex('questions', ['isActive'], {
      name: 'questions_isActive_index',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('questions');
  },
};
