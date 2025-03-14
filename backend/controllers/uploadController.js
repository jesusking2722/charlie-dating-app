const uploadImage = async (req, res) => {
  try {
    if (!req.files) {
      return res.json({ success: false, message: "Uploading image failed" });
    }

    const imageUrls = req.files.map(
      (file) => `http://192.168.0.2:5000/uploads/${file.filename}`
    );
    console.log(imageUrls);

    res.json({ data: { imageUrls }, success: true });
  } catch (error) {
    console.log("upload image error: ", error);
  }
};

module.exports = { uploadImage };
