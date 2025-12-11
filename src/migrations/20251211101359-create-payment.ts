import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('payments', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: true, // Allow null initially or default handled by app logic
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP + INTERVAL '30 days'"), // This is dialect specific, safer to handle in app logic usually, but here we can try or just leave it without default in DB
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.addIndex('payments', ['userId'], {
      name: 'payments_userId_index',
    });

    await queryInterface.addIndex('payments', ['paymentStatus'], {
      name: 'payments_paymentStatus_index',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('payments');
  },
};
