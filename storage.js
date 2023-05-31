// module.exports = (sequelize, DataTypes) => {
//     const Booking = sequelize.define("Booking", {
//         id:{
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//             unique:true
//         },
//         room_id:{
//             type: DataTypes.INTEGER,
//             allowNull: false
//         },
//         check_in:{
//             type: DataTypes.DATE,
//             allowNull: false
//         },
//         check_out:{
//             type: DataTypes.DATE,
//             allowNull: false
//         },
//         price:{
//             type: DataTypes.FLOAT,
//             allowNull: false
//         },
//         image:{
//             type: DataTypes.TEXT,
//             allowNull: false
//         }
//     })

//     return Booking

// }


// 


// module.exports = (sequelize, DataTypes) => {
//     const Login = sequelize.define("Login", {
//         id:{
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//             unique:true
//         },
//         email:{
//             type: DataTypes.STRING,
//             unique:true,
//             allowNull: false
//         },
//         password:{
//             type: DataTypes.STRING,
//             allowNull: false
//         }
      
//     })

//     Login.associate = (models) => {
//         Login.belongsTo(models.User, {
//            foreignKey: "user_id",
//            onDelete:"CASCADE",
//            unique:true
//         })
//     }

//     return Login
// }

