const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/images/:id", async (req, res) => {
  const { id } = req.params;
  const { imageUrls } = req.body;

  console.log("Requested SubSubCategory ID:", id);

  try {
    const subSubCategory = await prisma.subSubCategory.findUnique({
      where: { id: parseInt(id) },
    });

    console.log("Fetched SubSubCategory:", subSubCategory);

    if (!subSubCategory) {
      return res.status(404).json({ error: "SubSubCategory not found", id });
    }

    if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
      return res.status(400).json({ error: "No image URLs provided" });
    }

    const images = await prisma.image.createMany({
      data: imageUrls.map((url) => ({
        imageUrl: url,
        subSubCategoryId: subSubCategory.id,
      })),
    });

    res.status(200).json({ message: "Images added successfully", images });
  } catch (error) {
    console.error("Error adding images:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;
