const { Router } = require("express");
const ImageRouter = Router();
const Image = require("../models/images");
const { upload } = require("../middleware/imageUpload");

ImageRouter.post('/images', upload.single("image"), async (req, res) => {
  const image = await new Image({ key: req.file.filename, originalFileName: req.file.originalname }).save();
  res.json(image);
});

ImageRouter.get("/images", async (req, res) => {
  const images = await Image.find();
  res.json(images);
});

module.exports = { ImageRouter };