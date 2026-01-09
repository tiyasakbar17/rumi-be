import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface Option {
  optionId: string;
  text: string;
  isCorrect: boolean;
}

interface QuestionAttributes {
  id: string;
  section: 'listening' | 'structure' | 'reading';
  questionNumber: number;
  questionText: string;
  audioUrl?: string | null;
  audioDuration?: number | null;
  passageText?: string | null;
  difficulty: 'easy' | 'medium' | 'hard';
  options: Option[];
  explanation?: string | null;
  knowledgeType?: string | null;
  createdBy: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id' | 'audioUrl' | 'audioDuration' | 'passageText' | 'difficulty' | 'options' | 'explanation' | 'knowledgeType' | 'isActive' | 'createdAt' | 'updatedAt'> {}

export class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
  public id!: string;
  public section!: 'listening' | 'structure' | 'reading';
  public questionNumber!: number;
  public questionText!: string;
  public audioUrl!: string | null;
  public audioDuration!: number | null;
  public passageText!: string | null;
  public difficulty!: 'easy' | 'medium' | 'hard';
  public options!: Option[];
  public explanation!: string | null;
  public knowledgeType!: string | null;
  public createdBy!: string;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    // belongsToMany: Test (through TestQuestion)
    if (models.Test && models.TestQuestion) {
      Question.belongsToMany(models.Test, {
        through: models.TestQuestion,
        foreignKey: 'questionId',
        otherKey: 'testId',
        as: 'tests'
      });
    }

    // hasMany: UserAnswer
    if (models.UserAnswer) {
      Question.hasMany(models.UserAnswer, { foreignKey: 'questionId', as: 'userAnswers' });
    }

    if (models.User) {
        Question.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
    }
  }
}

export default (sequelize: Sequelize) => {
  Question.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
        type: DataTypes.JSON, // Use JSON for MySQL/Postgres
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
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: 'questions',
      timestamps: true,
      indexes: [
        {
          fields: ['section'],
        },
        {
          fields: ['difficulty'],
        },
        {
          fields: ['isActive'],
        },
      ],
    }
  );

  return Question;
};
