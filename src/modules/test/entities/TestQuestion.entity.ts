import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface TestQuestionAttributes {
  id: string;
  testId: string;
  questionId: string;
  orderInTest: number;
  section: 'listening' | 'structure' | 'reading';
  createdAt?: Date;
  updatedAt?: Date;
}

interface TestQuestionCreationAttributes extends Optional<TestQuestionAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class TestQuestion extends Model<TestQuestionAttributes, TestQuestionCreationAttributes> implements TestQuestionAttributes {
  public id!: string;
  public testId!: string;
  public questionId!: string;
  public orderInTest!: number;
  public section!: 'listening' | 'structure' | 'reading';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    if (models.Test) {
      TestQuestion.belongsTo(models.Test, { foreignKey: 'testId', as: 'test' });
    }
    if (models.Question) {
      TestQuestion.belongsTo(models.Question, { foreignKey: 'questionId', as: 'question' });
    }
  }
}

export default (sequelize: Sequelize) => {
  TestQuestion.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      testId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tests',
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
      orderInTest: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      section: {
        type: DataTypes.ENUM('listening', 'structure', 'reading'),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'test_questions',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['testId', 'questionId'],
        },
      ],
    }
  );

  return TestQuestion;
};
