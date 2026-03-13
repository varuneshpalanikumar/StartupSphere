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
        message: "Funding request already sent to this investor for this startup"
      });
    }

    const newRequest = new InvestorRequest({
      startup: startupId,
      founder: founderId,
      investor: investorId,
      requestType: "funding",
      message
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

// investor views pending requests
exports.getRequestsForInvestor = async (req, res) => {
  try {
    const requests = await InvestorRequest.find({
      investor: req.params.investorId,
      status: "pending"
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

// founder views requests sent by them
exports.getRequestsForFounder = async (req, res) => {
  try {
    const requests = await InvestorRequest.find({
      founder: req.params.founderId
    })
      .populate("startup", "title")
      .populate("investor", "name email");

    res.json(requests);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching founder investor requests",
      error: error.message
    });
  }
};

// investor accepts request
exports.acceptInvestorRequest = async (req, res) => {
  try {
    const request = await InvestorRequest.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({
        message: "Investor request not found"
      });
    }

    request.status = "accepted";
    await request.save();

    await Startup.findByIdAndUpdate(
      request.startup,
      { $addToSet: { investorsInterested: request.investor } }
    );

    res.json({
      message: "Funding request accepted"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error accepting investor request",
      error: error.message
    });
  }
};

// investor rejects request
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
const handleRequestAction = async (requestId, action) => {
  try {
    await API.put(`/investor-requests/${action}/${requestId}`);

    setIsError(false);
    setMessage(
      action === "accept"
        ? "Funding request accepted successfully"
        : "Funding request rejected successfully"
    );

    fetchRequests();
  } catch (error) {
    console.error(error);
    setIsError(true);
    setMessage("Failed to update funding request");
  }
};