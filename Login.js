
module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define("Login", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique:true
        },
        email:{
            type: DataTypes.STRING,
            unique:true,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }
      
    })

    Login.associate = (models) => {
        Login.belongsTo(models.Users, {
           foreignKey: "user_id",
           onDelete:"CASCADE",
           unique:true
        })
    }

    return Login
}

