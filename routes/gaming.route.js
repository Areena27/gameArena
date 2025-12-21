const express = require("express");
const { createGame } = require("../controller/game.controller");
const protectRoute = require("../middleware/auth");
const gameRouter = express.Router();
//create game
gameRouter.use(protectRoute)
gameRouter.route("/").post(createGame);

module.exports = gameRouter;
