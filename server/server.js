require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const { imageRouter } = require("./routes/imageRouter");
const { userRouter } = require("./routes/userRouter");


const app = express();

const { MONGO_URI, PORT } = process.env;

mongoose.connect(
    MONGO_URI , {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => {
  console.log("MongoDB Connect")
  app.use("/uploads", express.static("uploads"));
  app.use(express.json());
  app.use("/images", imageRouter);
  app.use("/users", userRouter);

  app.listen(PORT, () => console.log("Express server listening on PORT " + PORT));

})
.catch(err => console.log(err))
