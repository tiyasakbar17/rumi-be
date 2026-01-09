import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface PaymentProofAttributes {
  id: string;
  paymentId: string;
  proofImageUrl: string;
  proofImageKey: string;
  fileSize: number;
  uploadedAt: Date;
}

interface PaymentProofCreationAttributes extends Optional<PaymentProofAttributes, 'id' | 'uploadedAt'> {}

export class PaymentProof extends Model<PaymentProofAttributes, PaymentProofCreationAttributes> implements PaymentProofAttributes {
  public id!: string;
  public paymentId!: string;
  public proofImageUrl!: string;
  public proofImageKey!: string;
  public fileSize!: number;
  public uploadedAt!: Date;

  public static associate(models: any) {
    if (models.Payment) {
      PaymentProof.belongsTo(models.Payment, { foreignKey: 'paymentId', as: 'payment' });
    }
  }
}

export default (sequelize: Sequelize) => {
  PaymentProof.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      paymentId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'payments',
          key: 'id',
        },
      },
      proofImageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      proofImageKey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      uploadedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'payment_proofs',
      timestamps: false,
    }
  );

  return PaymentProof;
};
