const express = require("express");
const router = express.Router();

const {
  createInvestorRequest,
  getRequestsForInvestor,
  getRequestsForFounder,
  acceptInvestorRequest,
  rejectInvestorRequest
} = require("../controllers/investorRequestController");

router.post("/", createInvestorRequest);

router.get("/investor/:investorId", getRequestsForInvestor);
router.get("/founder/:founderId", getRequestsForFounder);

router.put("/accept/:requestId", acceptInvestorRequest);
router.put("/reject/:requestId", rejectInvestorRequest);

module.exports = router;