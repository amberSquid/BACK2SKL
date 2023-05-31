const express = require('express');
const db = require('./models');
const cors = require("cors")


const app = express();
require('dotenv').config();


app.use(express.json())
app.use(cors())



const userRouter = require("./routes/UserRoute")
const propertyRouter = require("./routes/PropertyRoute")
const roomRouter = require("./routes/RoomRoute")



app.use("/api/v1/auth", userRouter)
app.use("/api/v1/property", propertyRouter)
app.use("/api/v1/rooms", roomRouter)







db.sequelize.sync().then(() => {
    app.listen(5001, () => {
      console.log("Server running on port 5001");
    });
  });