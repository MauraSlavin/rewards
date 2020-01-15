module.exports = (sequelize, DataTypes) => {
  const Child = sequelize.define('Child', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });

  Child.associate = (models) => {
    // A child belongs to one or two parents
    Child.belongsTo(models.Parent, {
      as: 'Parent1',
      foreignKey: {
        allowNull: false,
      },
    });
    Child.belongsTo(models.Parent, {
      as: 'Parent2',
      foreignKey: {
        allowNull: true,
      },
    });

  };
  return Child;
};
