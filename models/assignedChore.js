module.exports = (sequelize, DataTypes) => {
  const assignedchore = sequelize.define('Assignedchore', {
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

  assignedchore.associate = (models) => {
    // We're saying that a AssignedChore should belong to a Child and to a Chore
    assignedchore.belongsTo(models.Child, {
      foreignKey: {
        allowNull: false,
      },
    });
    assignedchore.belongsTo(models.Chore, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return assignedchore;
};
