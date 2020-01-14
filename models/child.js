module.exports = (sequelize, DataTypes) => {
  const Child = sequelize.define('Child', {
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
  });
  
  Child.associate = (models) => {
    // A child belongs to one or two parents
    Child.belongsTo(models.Parent, {
      as: 'Parent1',
      foreignKey: {
        allowNull: false,
      },
    },
    Child.belongsTo(models.Parent, {
      as: 'Parent2',
      foreignKey: {
        allowNull:true,
      }
    }));

  };
  return Child;
};
