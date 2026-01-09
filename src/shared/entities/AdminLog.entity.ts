import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface AdminLogAttributes {
  id: string;
  adminId: string;
  action: string;
  actionDetails: object;
  targetEntity: string;
  targetEntityId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AdminLogCreationAttributes extends Optional<AdminLogAttributes, 'id' | 'actionDetails' | 'createdAt' | 'updatedAt'> {}

export class AdminLog extends Model<AdminLogAttributes, AdminLogCreationAttributes> implements AdminLogAttributes {
  public id!: string;
  public adminId!: string;
  public action!: string;
  public actionDetails!: object;
  public targetEntity!: string;
  public targetEntityId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    if (models.User) {
      AdminLog.belongsTo(models.User, { foreignKey: 'adminId', as: 'admin' });
    }
  }
}

export default (sequelize: Sequelize) => {
  AdminLog.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      adminId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      actionDetails: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      targetEntity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      targetEntityId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'admin_logs',
      timestamps: true,
    }
  );

  return AdminLog;
};
