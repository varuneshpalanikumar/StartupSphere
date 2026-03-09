const express = require("express");
const router = express.Router();

const { searchUsers, getJoinedProjects } = require("../controllers/userController");

router.get("/search", searchUsers);

router.get("/:userId/joined-projects", getJoinedProjects);

module.exports = router;