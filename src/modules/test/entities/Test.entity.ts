import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface TestAttributes {
  id: string;
  testName: string;
  testType: 'full' | 'diagnostic';
  totalDuration: number;
  passingScore: number;
  isPublished: boolean;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TestCreationAttributes extends Optional<TestAttributes, 'id' | 'testType' | 'totalDuration' | 'passingScore' | 'isPublished' | 'createdAt' | 'updatedAt'> {}

export class Test extends Model<TestAttributes, TestCreationAttributes> implements TestAttributes {
  public id!: string;
  public testName!: string;
  public testType!: 'full' | 'diagnostic';
  public totalDuration!: number;
  public passingScore!: number;
  public isPublished!: boolean;
  public createdBy!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    // belongsToMany: Question (through TestQuestion)
    if (models.Question && models.TestQuestion) {
      Test.belongsToMany(models.Question, {
        through: models.TestQuestion,
        foreignKey: 'testId',
        otherKey: 'questionId',
        as: 'questions'
      });
    }

    // Associations placeholders for future models
    if (models.TestSession) {
      Test.hasMany(models.TestSession, { foreignKey: 'testId', as: 'testSessions' });
    }
    if (models.TestResult) {
      Test.hasMany(models.TestResult, { foreignKey: 'testId', as: 'testResults' });
    }
    if (models.User) {
        Test.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
    }
  }
}

export default (sequelize: Sequelize) => {
  Test.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      testName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      testType: {
        type: DataTypes.ENUM('full', 'diagnostic'),
        defaultValue: 'full',
      },
      totalDuration: {
        type: DataTypes.INTEGER,
        defaultValue: 150, // minutes
      },
      passingScore: {
        type: DataTypes.INTEGER,
        defaultValue: 450,
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'tests',
      timestamps: true,
    }
  );

  return Test;
};
