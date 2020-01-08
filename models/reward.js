module.exports = (sequelize, DataTypes) => {
  const Reward = sequelize.define('Reward', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
  return Reward;
};
