import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface TestResultAttributes {
  id: string;
  userId: string;
  testSessionId: string;
  testId: string;
  listeningRawScore: number;
  structureRawScore: number;
  readingRawScore: number;
  listeningScore: number;
  structureScore: number;
  readingScore: number;
  totalScore: number;
  percentile: number;
  performanceLevel: 'beginner' | 'intermediate' | 'advanced' | 'proficient';
  strengths: string[];
  weaknesses: string[];
  recommendations?: string | null;
  completedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TestResultCreationAttributes extends Optional<TestResultAttributes, 'id' | 'recommendations' | 'strengths' | 'weaknesses' | 'completedAt' | 'createdAt' | 'updatedAt'> {}

export class TestResult extends Model<TestResultAttributes, TestResultCreationAttributes> implements TestResultAttributes {
  public id!: string;
  public userId!: string;
  public testSessionId!: string;
  public testId!: string;
  public listeningRawScore!: number;
  public structureRawScore!: number;
  public readingRawScore!: number;
  public listeningScore!: number;
  public structureScore!: number;
  public readingScore!: number;
  public totalScore!: number;
  public percentile!: number;
  public performanceLevel!: 'beginner' | 'intermediate' | 'advanced' | 'proficient';
  public strengths!: string[];
  public weaknesses!: string[];
  public recommendations!: string | null;
  public completedAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    if (models.User) {
      TestResult.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
    if (models.TestSession) {
      TestResult.belongsTo(models.TestSession, { foreignKey: 'testSessionId', as: 'testSession' });
    }
    if (models.Test) {
      TestResult.belongsTo(models.Test, { foreignKey: 'testId', as: 'test' });
    }
  }
}

export default (sequelize: Sequelize) => {
  TestResult.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      testSessionId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'test_sessions',
          key: 'id',
        },
      },
      testId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tests',
          key: 'id',
        },
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
    },
    {
      sequelize,
      tableName: 'test_results',
      timestamps: true,
      indexes: [
        {
          fields: ['userId'],
        },
        {
          fields: ['totalScore'],
        },
        {
          fields: ['percentile'],
        },
      ],
    }
  );

  return TestResult;
};
