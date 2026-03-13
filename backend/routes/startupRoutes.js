const express = require("express");
const router = express.Router();
const {
  createStartup,
  getAllStartups,
  calculateStartupScore,
  updateStartupProgress,
  addInvestorInterest,
  getStartupDetails,
  searchStartups,
  getFounderStartups,
  getMentorStartups,
  getInvestorStartups
} = require("../controllers/startupController");

router.post("/create", createStartup);

router.get("/all", getAllStartups);

router.get("/score/:startupId", calculateStartupScore);

router.put("/progress/:startupId", updateStartupProgress);

router.put("/invest/:startupId", addInvestorInterest);

router.get("/details/:startupId", getStartupDetails);

router.get("/search", searchStartups);

router.get("/founder/:founderId", getFounderStartups);

router.get("/mentor/:mentorId", getMentorStartups);

router.get("/investor/:investorId", getInvestorStartups);

module.exports = router;