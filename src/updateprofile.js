const express = require("express");
const { PrismaClient } = require("@prisma/client");
const Joi = require("joi");
const bcrypt = require("bcrypt"); 
const prisma = new PrismaClient();
const router = express.Router();

const saltRounds = 10; 
const updateProfileSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  mobileNumber: Joi.string().optional(),
  password: Joi.string().min(6).optional(), 
  gender: Joi.string().valid("male", "female", "other").optional(),
  city: Joi.string().optional(),
});

router.put("/update-profile/:id", async (req, res) => {

  const { id } = req.params;
  const { name, email, mobileNumber, password, gender, city } = req.body;

  const { error } = updateProfileSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    if (email && email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ error: "Email is already in use" });
      }
    }

    let hashedPassword = existingUser.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name: name || existingUser.name,
        email: email || existingUser.email,
        mobileNumber: mobileNumber || existingUser.mobileNumber,
        password: hashedPassword,
        gender: gender || existingUser.gender,
        city: city || existingUser.city,
      },
    });
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

