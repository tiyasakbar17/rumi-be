import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface TestSessionAttributes {
  id: string;
  userId: string;
  testId: string;
  sessionStatus: 'started' | 'in_progress' | 'submitted' | 'graded';
  startedAt: Date;
  submittedAt?: Date | null;
  completionTimeSeconds?: number | null;
  currentSection: 'listening' | 'structure' | 'reading' | 'completed';
  lastActivityAt: Date;
  randomizedAnswerOrder: object;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TestSessionCreationAttributes extends Optional<TestSessionAttributes, 'id' | 'sessionStatus' | 'startedAt' | 'submittedAt' | 'completionTimeSeconds' | 'currentSection' | 'lastActivityAt' | 'randomizedAnswerOrder' | 'createdAt' | 'updatedAt'> {}

export class TestSession extends Model<TestSessionAttributes, TestSessionCreationAttributes> implements TestSessionAttributes {
  public id!: string;
  public userId!: string;
  public testId!: string;
  public sessionStatus!: 'started' | 'in_progress' | 'submitted' | 'graded';
  public startedAt!: Date;
  public submittedAt!: Date | null;
  public completionTimeSeconds!: number | null;
  public currentSection!: 'listening' | 'structure' | 'reading' | 'completed';
  public lastActivityAt!: Date;
  public randomizedAnswerOrder!: object;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    if (models.User) {
      TestSession.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
    if (models.Test) {
      TestSession.belongsTo(models.Test, { foreignKey: 'testId', as: 'test' });
    }
    if (models.UserAnswer) {
      TestSession.hasMany(models.UserAnswer, { foreignKey: 'testSessionId', as: 'userAnswers' });
    }
    if (models.TestResult) {
      TestSession.hasOne(models.TestResult, { foreignKey: 'testSessionId', as: 'testResult' });
    }
  }
}

export default (sequelize: Sequelize) => {
  TestSession.init(
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
      testId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tests',
          key: 'id',
        },
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
    },
    {
      sequelize,
      tableName: 'test_sessions',
      timestamps: true,
      indexes: [
        {
          fields: ['userId'],
        },
        {
          fields: ['testId'],
        },
        {
          fields: ['sessionStatus'],
        },
      ],
    }
  );

  return TestSession;
};
