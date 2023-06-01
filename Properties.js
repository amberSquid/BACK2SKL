
module.exports = (sequelize, DataTypes) => {
    const Properties = sequelize.define("Properties", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        property_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        property_type:{
            type: DataTypes.STRING,
            allowNull: false
        },
        property_description:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        ratings:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        num_rooms:{
            type: DataTypes.INTEGER,
            allowNull: false
        }



    })

    Properties.associate  = (models) => {
        Properties.belongsTo(models.Location, {
            foreignKey: "location_id",
            onDelete: "CASCADE",
            unique:true
        })
    }

    return Properties
}