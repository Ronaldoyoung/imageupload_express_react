const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    key: { type: String, require: true },
    originalFileName: { type: String, require: true},
  }, { timestamps: true}
);

module.exports = mongoose.model("image", ImageSchema);