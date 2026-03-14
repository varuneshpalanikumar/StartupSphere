const InvestorRequest = require("../models/InvestorRequest");
const User = require("../models/User");
const Startup = require("../models/Startup");

// founder sends funding request to investor
exports.createInvestorRequest = async (req, res) => {
  try {
    const { startupId, founderId, investorId, message } = req.body;

    const startup = await Startup.findById(startupId);

    if (!startup) {
      return res.status(404).json({
        message: "Startup not found"
      });
    }

    const investor = await User.findById(investorId);

    if (!investor || investor.role !== "investor") {
      return res.status(404).json({
        message: "Investor not found"
      });
    }

    const existingRequest = await InvestorRequest.findOne({
      startup: startupId,
      investor: investorId,
      requestType: "funding"
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Funding request already exists for this investor and startup"
      });
    }

    const newRequest = new InvestorRequest({
      startup: startupId,
      founder: founderId,
      investor: investorId,
      requestType: "funding",
      initiatedBy: "founder",
      message: message || "We would like to request funding support for this startup."
    });

    await newRequest.save();

    res.status(201).json({
      message: "Funding request sent successfully",
      request: newRequest
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating investor request",
      error: error.message
    });
  }
};

// investor shows interest in startup
exports.investorShowInterest = async (req, res) => {
  try {
    const { startupId, investorId, message } = req.body;

    const startup = await Startup.findById(startupId);

    if (!startup) {
      return res.status(404).json({
        message: "Startup not found"
      });
    }

    const investor = await User.findById(investorId);

    if (!investor || investor.role !== "investor") {
      return res.status(404).json({
        message: "Investor not found"
      });
    }

    const existingRequest = await InvestorRequest.findOne({
      startup: startupId,
      investor: investorId,
      requestType: "funding"
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Interest/request already exists for this startup"
      });
    }

    const newRequest = new InvestorRequest({
      startup: startupId,
      founder: startup.founder,
      investor: investorId,
      requestType: "funding",
      initiatedBy: "investor",
      message: message || "Investor has shown interest in funding this startup."
    });

    await newRequest.save();

    res.status(201).json({
      message: "Interest sent successfully",
      request: newRequest
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error showing investor interest",
      error: error.message
    });
  }
};

// investor views pending requests sent to them by founders
exports.getRequestsForInvestor = async (req, res) => {
  try {
    const requests = await InvestorRequest.find({
      investor: req.params.investorId,
      status: "pending",
      initiatedBy: "founder"
    })
      .populate("startup", "title description startupScore progress fundingRequired")
      .populate("founder", "name email")
      .populate("investor", "name email");

    res.json(requests);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching investor requests",
      error: error.message
    });
  }
};

// founder views all investor-related requests for their startups
exports.getRequestsForFounder = async (req, res) => {
  try {
    const requests = await InvestorRequest.find({
      founder: req.params.founderId
    })
      .populate("startup", "title description startupScore progress fundingRequired")
      .populate("investor", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching founder investor requests",
      error: error.message
    });
  }
};

// accept request
// if founder initiated -> investor accepts and investor gets added
// if investor initiated -> founder accepts and investor gets added
exports.acceptInvestorRequest = async (req, res) => {
  try {
    const request = await InvestorRequest.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({
        message: "Investor request not found"
      });
    }

    if (request.status === "accepted") {
      return res.json({
        message: "Request already accepted"
      });
    }

    if (request.status === "rejected") {
      return res.status(400).json({
        message: "Rejected request cannot be accepted"
      });
    }

    request.status = "accepted";
    await request.save();

    await Startup.findByIdAndUpdate(request.startup, {
      $addToSet: { investorsInterested: request.investor }
    });

    res.json({
      message: "Investor successfully added to project"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error accepting investor request",
      error: error.message
    });
  }
};

// reject request
exports.rejectInvestorRequest = async (req, res) => {
  try {
    const request = await InvestorRequest.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({
        message: "Investor request not found"
      });
    }

    request.status = "rejected";
    await request.save();

    res.json({
      message: "Funding request rejected"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error rejecting investor request",
      error: error.message
    });
  }
};