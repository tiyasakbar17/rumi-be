import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface UserAnswerAttributes {
  id: string;
  testSessionId: string;
  questionId: string;
  userId: string;
  selectedOption?: 'A' | 'B' | 'C' | 'D' | null;
  isCorrect?: boolean | null;
  timeTaken?: number | null;
  submittedAt: Date;
}

interface UserAnswerCreationAttributes extends Optional<UserAnswerAttributes, 'id' | 'selectedOption' | 'isCorrect' | 'timeTaken' | 'submittedAt'> {}

export class UserAnswer extends Model<UserAnswerAttributes, UserAnswerCreationAttributes> implements UserAnswerAttributes {
  public id!: string;
  public testSessionId!: string;
  public questionId!: string;
  public userId!: string;
  public selectedOption!: 'A' | 'B' | 'C' | 'D' | null;
  public isCorrect!: boolean | null;
  public timeTaken!: number | null;
  public submittedAt!: Date;

  public static associate(models: any) {
    if (models.TestSession) {
      UserAnswer.belongsTo(models.TestSession, { foreignKey: 'testSessionId', as: 'testSession' });
    }
    if (models.User) {
      UserAnswer.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
    if (models.Question) {
      UserAnswer.belongsTo(models.Question, { foreignKey: 'questionId', as: 'question' });
    }
  }
}

export default (sequelize: Sequelize) => {
  UserAnswer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      testSessionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'test_sessions',
          key: 'id',
        },
      },
      questionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'questions',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
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
    },
    {
      sequelize,
      tableName: 'user_answers',
      timestamps: false,
      indexes: [
        {
          fields: ['testSessionId'],
        },
        {
          fields: ['questionId'],
        },
        {
          fields: ['userId'],
        },
      ],
    }
  );

  return UserAnswer;
};
