module.exports = (sequelize, DataTypes) => {
    const AmmenitiesList = sequelize.define("AmmenitiesList", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ammenity_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ammenity_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ammenities_icon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      external_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    });
  
    return AmmenitiesList;
  };
  