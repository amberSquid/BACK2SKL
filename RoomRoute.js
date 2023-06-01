const express = require("express");
const { createRoom, bookNow } = require("../controller/RoomController");

const router = express.Router()


router.post("/", createRoom)

router.post("/book", bookNow)

module.exports = router