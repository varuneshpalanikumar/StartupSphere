const User = require("../models/User");

exports.searchUsers = async (req, res) => {
  try {
    const { role, verified, skill, name } = req.query;

    let filter = {};

    if (role) {
      filter.role = role;
    }

    if (verified !== undefined) {
      filter.verified = verified === "true";
    }

    if (skill) {
      filter.skills = { $in: [skill] };
    }

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    const users = await User.find(filter).select("-password");

    res.json(users);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error searching users",
      error: error.message
    });
  }
};
exports.getJoinedProjects = async (req, res) => {

  try {

    const user = await User.findById(req.params.userId)
      .populate("joinedProjects");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user.joinedProjects);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching joined projects",
      error: error.message
    });

  }

};