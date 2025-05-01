const express = require("express");
const router = express.Router();
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
