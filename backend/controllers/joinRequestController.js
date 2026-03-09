const JoinRequest = require("../models/JoinRequest");
const Startup = require("../models/Startup");
const User = require("../models/User");

// PROFESSIONAL SENDS JOIN REQUEST
exports.createJoinRequest = async (req, res) => {
  try {
    const { startupId, professionalId, message } = req.body;

    const startup = await Startup.findById(startupId);

    if (!startup) {
      return res.status(404).json({
        message: "Startup not found"
      });
    }

    const existingRequest = await JoinRequest.findOne({
      startup: startupId,
      professional: professionalId
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "You already sent a join request for this startup"
      });
    }

    const newRequest = new JoinRequest({
      startup: startupId,
      professional: professionalId,
      message
    });

    await newRequest.save();

    res.status(201).json({
      message: "Join request sent successfully",
      request: newRequest
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error sending request",
      error: error.message
    });
  }
};

// GET PENDING JOIN REQUESTS FOR A STARTUP
exports.getStartupJoinRequests = async (req, res) => {
  try {
    const requests = await JoinRequest.find({
      startup: req.params.startupId,
      status: "pending"
    }).populate("professional", "name email verified");

    res.json(requests);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching requests",
      error: error.message
    });
  }
};

// FOUNDER ACCEPTS REQUEST
exports.acceptJoinRequest = async (req, res) => {
  try {
    const request = await JoinRequest.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    if (request.status === "accepted") {
      return res.json({
        message: "Request already accepted"
      });
    }

    request.status = "accepted";
    await request.save();

    await Startup.findByIdAndUpdate(
      request.startup,
      {
        $addToSet: { professionalsJoined: request.professional }
      }
    );

    await User.findByIdAndUpdate(
      request.professional,
      {
        $addToSet: { joinedProjects: request.startup }
      }
    );

    res.json({
      message: "Professional successfully added to startup team"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error accepting request",
      error: error.message
    });
  }
};

// FOUNDER REJECTS REQUEST
exports.rejectJoinRequest = async (req, res) => {
  try {
    const request = await JoinRequest.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    request.status = "rejected";
    await request.save();

    res.json({
      message: "Request rejected"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error rejecting request",
      error: error.message
    });
  }
};

// VERIFIED PROFESSIONAL VOTES
exports.voteJoinRequest = async (req, res) => {
  try {
    const { voterId, voteType } = req.body;

    const voter = await User.findById(voterId);

    if (!voter) {
      return res.status(404).json({
        message: "Voter not found"
      });
    }

    if (voter.role !== "professional") {
      return res.status(403).json({
        message: "Only professionals can vote"
      });
    }

    if (voter.verified !== true) {
      return res.status(403).json({
        message: "Only verified professionals can vote"
      });
    }

    const request = await JoinRequest.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({
        message: "Join request not found"
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "Voting allowed only for pending requests"
      });
    }

    if (voteType !== "up" && voteType !== "down") {
      return res.status(400).json({
        message: "voteType must be 'up' or 'down'"
      });
    }

    if (existingVote && existingVote.voteType === voteType) {
      return res.json({
        message: "Vote already recorded"
      });
    }
    const existingVote = request.votes.find(
      (vote) => vote.voter.toString() === voterId
    );

    if (!existingVote) {
      request.votes.push({
        voter: voterId,
        voteType: voteType
      });
    } else {
      existingVote.voteType = voteType;
    }

    request.upVotes = request.votes.filter(v => v.voteType === "up").length;
    request.downVotes = request.votes.filter(v => v.voteType === "down").length;

    await request.save();

    res.json({
      message: "Vote recorded successfully",
      upVotes: request.upVotes,
      downVotes: request.downVotes
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error recording vote",
      error: error.message
    });
  }
};