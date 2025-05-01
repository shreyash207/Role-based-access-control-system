const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const Role = require("../constant/Role");

// Get user by userId (accessible by all roles)
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


// Update user by userId (accessible by all roles)
router.put("/:userId", authMiddleware, async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


// Delete user by userId (accessible by admin only)
router.delete(
  "/:userId",
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).select("-password");
      if (!user) return res.status(404).json({ msg: "User not found" });

      await user.remove();
      res.status(200).json({ msg: "User deleted successfully" });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);


// Get all users (accessible by admin only)
router.get(
  "/",
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);


// Create a new user
router.post('/', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      if (!name || !email || !password || !role) {
        return res.status(400).json({ msg: 'Please include name, email, password and role' });
      }

      // ensure role is valid
      if (!Object.values(Role).includes(role)) {
        return res.status(400).json({ msg: 'Invalid role' });
      }
      // check for existing user
      let existing = await User.findOne({ email });
      if (existing) {
        return res.status(409).json({ msg: 'Email already registered' });
      }
      
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const user = new User({ name, email, password: hash, role });
      await user.save();

      const { password: pw, ...userData } = user.toObject();
      res.status(201).json({ msg: 'User created', user: userData });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);


// Assign a role to a user by userId (only admin can assign roles)
router.put(
  "/assign-role/:userId",
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  async (req, res) => {
    const { role } = req.body;

    if (!Object.values(Role).includes(role)) {
      return res.status(400).json({ msg: "Invalid role" });
    }

    try {
      const user = await User.findById(req.params.userId).select("-password");
      if (!user) return res.status(404).json({ msg: "User not found" });

      user.role = role;
      await user.save();

      res.status(200).json({ msg: "Role assigned successfully", user });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
