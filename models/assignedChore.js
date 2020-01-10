module.exports = (sequelize) => {
  const AssignedChore = sequelize.define('AssignedChore', {
    // only has id (PRIMARY KEY) & 2 foreign keys (below), so nothing needed here.
  });

  AssignedChore.associate = (models) => {
    // We're saying that a AssignedChore should belong to a Child and to a Chore
    AssignedChore.belongsTo(models.Child, {
      foreignKey: {
        allowNull: false,
      },
    });
    AssignedChore.belongsTo(models.Chore, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return AssignedChore;
};
