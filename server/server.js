require("dotenv").config();
const express = require('express');
const multer = require('multer');
const { v4: uuid }  = require('uuid');
const mime = require('mime-types');
const mongoose = require('mongoose');

console.log('uuid: ', uuid());

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
});

const upload = multer({ storage, fileFilter: (req, file, cb) => { 
    if(["image/png", "image/jpeg"].includes(file.mimetype)) cb(null, true)
    else cb(new Error('invalid file type.'), false)
  },
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

const app = express();
const PORT = 5000;

mongoose.connect(
    process.env.MONGO_URI , {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => {
  console.log("MongoDB Connect")
  app.use("/uploads", express.static("uploads"));

  app.post('/upload', upload.single("image"), (req, res) => {  
    // return res.status(500).json({ error: "server failure" })
    res.json(req.file);
  });

  app.listen(PORT, () => console.log("Express server listening on PORT " + PORT));

})
.catch(err => console.log(err))
