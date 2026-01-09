import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface UserDiagnosticAnalysisAttributes {
  id: string;
  userId: string;
  lastDiagnosticTestId?: string | null;
  lastDiagnosticScore?: number | null;
  lastDiagnosticDate?: Date | null;
  strongAreas: string[];
  weakAreas: string[];
  improvementTrend?: 'improving' | 'stable' | 'declining' | null;
  scoreTrend: object[]; // Array of {date, score}
  recommendedFocus?: string | null;
  updatedAt?: Date;
}

interface UserDiagnosticAnalysisCreationAttributes extends Optional<UserDiagnosticAnalysisAttributes, 'id' | 'lastDiagnosticTestId' | 'lastDiagnosticScore' | 'lastDiagnosticDate' | 'strongAreas' | 'weakAreas' | 'improvementTrend' | 'scoreTrend' | 'recommendedFocus' | 'updatedAt'> {}

export class UserDiagnosticAnalysis extends Model<UserDiagnosticAnalysisAttributes, UserDiagnosticAnalysisCreationAttributes> implements UserDiagnosticAnalysisAttributes {
  public id!: string;
  public userId!: string;
  public lastDiagnosticTestId!: string | null;
  public lastDiagnosticScore!: number | null;
  public lastDiagnosticDate!: Date | null;
  public strongAreas!: string[];
  public weakAreas!: string[];
  public improvementTrend!: 'improving' | 'stable' | 'declining' | null;
  public scoreTrend!: object[];
  public recommendedFocus!: string | null;

  public readonly updatedAt!: Date;

  public static associate(models: any) {
    if (models.User) {
      UserDiagnosticAnalysis.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
    // Optionally link to TestResult if needed, though defined as nullable UUID in requirements
    if (models.TestResult) {
        UserDiagnosticAnalysis.belongsTo(models.TestResult, { foreignKey: 'lastDiagnosticTestId', as: 'lastDiagnosticTestResult' });
    }
  }
}

export default (sequelize: Sequelize) => {
  UserDiagnosticAnalysis.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      lastDiagnosticTestId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'test_results',
            key: 'id',
        }
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
    },
    {
      sequelize,
      tableName: 'user_diagnostic_analyses',
      timestamps: false, // Only updatedAt is required by prompt
      indexes: [
        {
          unique: true,
          fields: ['userId'],
        },
      ],
    }
  );

  return UserDiagnosticAnalysis;
};
