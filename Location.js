

module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define("Location", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      street_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Location;
  };