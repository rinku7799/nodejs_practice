const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/categories", async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subCategories: {
          include: {
            subSubCategories: true
          },
        },
      },
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});


module.exports = router;
