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
  return Child;
};
