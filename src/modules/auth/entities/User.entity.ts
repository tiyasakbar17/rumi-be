import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface UserAttributes {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  userType: 'student' | 'admin';
  isEmailVerified: boolean;
  isActive: boolean;
  lastLogin?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'userType' | 'isEmailVerified' | 'isActive' | 'lastLogin' | 'createdAt' | 'updatedAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public userType!: 'student' | 'admin';
  public isEmailVerified!: boolean;
  public isActive!: boolean;
  public lastLogin!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    // hasMany: TestSession
    if (models.TestSession) {
      User.hasMany(models.TestSession, { foreignKey: 'userId', as: 'testSessions' });
    }
    // hasMany: TestResult
    if (models.TestResult) {
      User.hasMany(models.TestResult, { foreignKey: 'userId', as: 'testResults' });
    }
    // hasMany: UserAnswer
    if (models.UserAnswer) {
      User.hasMany(models.UserAnswer, { foreignKey: 'userId', as: 'userAnswers' });
    }
    // hasMany: Payment
    if (models.Payment) {
      User.hasMany(models.Payment, { foreignKey: 'userId', as: 'payments' });
    }
    // hasOne: UserDiagnosticAnalysis
    if (models.UserDiagnosticAnalysis) {
      User.hasOne(models.UserDiagnosticAnalysis, { foreignKey: 'userId', as: 'diagnosticAnalysis' });
    }
    // hasMany: AdminLog (as admin)
    if (models.AdminLog) {
      User.hasMany(models.AdminLog, { foreignKey: 'adminId', as: 'adminLogs' });
    }
  }
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userType: {
        type: DataTypes.ENUM('student', 'admin'),
        allowNull: false,
        defaultValue: 'student',
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['email'],
        },
        {
          fields: ['userType'],
        },
        {
          fields: ['isActive'],
        },
      ],
    }
  );

  return User;
};
