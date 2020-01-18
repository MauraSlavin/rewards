module.exports = (sequelize, DataTypes) => {
  const usedpoint = sequelize.define('usedpoint', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  usedpoint.associate = (models) => {
    // We're saying that a usedpoint should belong to a Child and to a Chore
    usedpoint.belongsTo(models.Child, {
      foreignKey: {
        allowNull: false,
      },
    });
    usedpoint.belongsTo(models.Reward, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return usedpoint;
};
