 const express = require("express");
 const {getRooms, createRoom} = require("../controllers/roomController");
 const router = express.Router();

 router.post("/", createRoom);
 router.get("/", getRooms);

 module.exports = router;