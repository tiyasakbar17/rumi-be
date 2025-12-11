import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface PaymentAttributes {
  id: string;
  userId: string;
  transactionId: string;
  paymentAmount: number;
  paymentFor: string;
  paymentStatus: 'pending' | 'approved' | 'rejected' | 'expired';
  rejectionReason?: string | null;
  uploadedProofAt?: Date | null;
  approvedAt?: Date | null;
  approvedBy?: string | null;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id' | 'paymentFor' | 'paymentStatus' | 'rejectionReason' | 'uploadedProofAt' | 'approvedAt' | 'approvedBy' | 'expiresAt' | 'createdAt' | 'updatedAt'> {}

export class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: string;
  public userId!: string;
  public transactionId!: string;
  public paymentAmount!: number;
  public paymentFor!: string;
  public paymentStatus!: 'pending' | 'approved' | 'rejected' | 'expired';
  public rejectionReason!: string | null;
  public uploadedProofAt!: Date | null;
  public approvedAt!: Date | null;
  public approvedBy!: string | null;
  public expiresAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    if (models.User) {
      Payment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Payment.belongsTo(models.User, { foreignKey: 'approvedBy', as: 'approver' });
    }
    if (models.PaymentProof) {
      Payment.hasOne(models.PaymentProof, { foreignKey: 'paymentId', as: 'paymentProof' });
    }
  }
}

export default (sequelize: Sequelize) => {
  Payment.init(
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
      transactionId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      paymentAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      paymentFor: {
        type: DataTypes.STRING,
        defaultValue: 'full_test_access',
      },
      paymentStatus: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected', 'expired'),
        defaultValue: 'pending',
      },
      rejectionReason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      uploadedProofAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      approvedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      approvedBy: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      expiresAt: {
        type: DataTypes.DATE,
        defaultValue: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
    },
    {
      sequelize,
      tableName: 'payments',
      timestamps: true,
      indexes: [
        {
          fields: ['userId'],
        },
        {
          fields: ['paymentStatus'],
        },
      ],
    }
  );

  return Payment;
};
