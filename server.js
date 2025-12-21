const dotenv = require("dotenv");
dotenv.config();
const express = require("express"); // npm i express
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.route");
const gameRouter = require("./routes/gaming.route");
const cookieParser = require("cookie-parser");


const port = 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
//mongoDb connetion
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.get("/",(req,res)=>{
    return res.json({
        sucess:true,
        message:"Hello Server",
    })
})
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/game",gameRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
