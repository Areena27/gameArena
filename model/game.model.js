const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
      trim: true,
      min: 1,
      max: 100,
      unique: true,
    },
    desc: {
      required: true,
      type: String,
      trim: true,
      min: 8,
      max: 500,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    avatar: {
      url: { type: String },
      public_id: { type: String },
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "action",
        "adventure",
        "puzzle",
        "rpg",
        "sports",
        "strategy",
        "other",
      ],
      default: "other",
    },
    status: {
      type: String,
      enum: ["approved", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);
const gameModel = mongoose.models.games || mongoose.model("games", gameSchema);
module.exports = gameModel;
