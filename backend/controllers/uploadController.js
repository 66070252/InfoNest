const uploadController = {
  uploadImage: async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    try {
      const imageUrlPath = `/uploads/${req.file.filename}`;

      res.status(200).json({ 
        message: "Upload successful", 
        imageUrl: imageUrlPath
      });
    } catch (error) {
      console.error("Error in uploadController:", error);
      res.status(500).json({ message: "Error processing file." });
    }
  }
};

export default uploadController;