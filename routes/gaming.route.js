const express = require("express");
const {
  createGame,
  listAllGame,
  approveGame,
} = require("../controller/game.controller");
const { protectRoute, authorizeRoles } = require("../middleware/auth");
const gameRouter = express.Router();
//create game
gameRouter.use(protectRoute);
gameRouter.route("/").post(authorizeRoles(["developer"]), createGame);
gameRouter.route("/").get(listAllGame);
gameRouter.route("/approve/:id").patch(authorizeRoles(["admin"]), approveGame);
// gameRouter.route("/").get(listAllGame);

module.exports = gameRouter;
