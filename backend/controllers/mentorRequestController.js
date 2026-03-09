const MentorRequest = require("../models/MentorRequest");
const User = require("../models/User");
const Startup = require("../models/Startup");



exports.createMentorRequest = async (req, res) => {
  try {
    const { startupId, founderId, mentorId, requestType, message } = req.body;

    const startup = await Startup.findById(startupId);

    if (!startup) {
      return res.status(404).json({
        message: "Startup not found"
      });
    }

    const mentor = await User.findById(mentorId);

    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({
        message: "Mentor not found"
      });
    }

    const existingRequest = await MentorRequest.findOne({
      startup: startupId,
      mentor: mentorId,
      requestType: requestType
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "This request has already been sent to this mentor for this startup"
      });
    }

    const newRequest = new MentorRequest({
      startup: startupId,
      founder: founderId,
      mentor: mentorId,
      requestType,
      message
    });

    await newRequest.save();

    res.status(201).json({
      message: "Mentor request created successfully",
      request: newRequest
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating mentor request",
      error: error.message
    });
  }
};

// mentor views requests sent to them
exports.getRequestsForMentor = async (req, res) => {
  try {
    const requests = await MentorRequest.find({
      mentor: req.params.mentorId,
      status: "pending"
    })
      .populate("startup", "title description startupScore progress")
      .populate("founder", "name email")
      .populate("mentor", "name email verified");

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching mentor requests",
      error: error.message
    });
  }
};

// founder views requests created by them
exports.getRequestsForFounder = async (req, res) => {
  try {
    const requests = await MentorRequest.find({
      founder: req.params.founderId
    })
      .populate("startup", "title")
      .populate("mentor", "name email verified");

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching founder mentor requests",
      error: error.message
    });
  }
};

exports.acceptMentorRequest = async (req, res) => {
  try {
    const request = await MentorRequest.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({ message: "Mentor request not found" });
    }

    request.status = "accepted";
    await request.save();

    // if mentorship accepted, add mentor to startup mentorsJoined
    if (request.requestType === "mentorship") {
      await Startup.findByIdAndUpdate(
        request.startup,
        { $addToSet: { mentorsJoined: request.mentor } }
      );
    }

    res.json({
      message: "Mentor request accepted",
      requestType: request.requestType,
      startupId: request.startup
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error accepting mentor request",
      error: error.message
    });
  }
};

// mentor rejects request
exports.rejectMentorRequest = async (req, res) => {
  try {
    const request = await MentorRequest.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({ message: "Mentor request not found" });
    }

    request.status = "rejected";
    await request.save();

    res.json({ message: "Mentor request rejected" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error rejecting mentor request",
      error: error.message
    });
  }
};