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
  getFounderStartups
} = require("../controllers/startupController");

router.post("/create", createStartup);

router.get("/all", getAllStartups);

router.get("/score/:startupId", calculateStartupScore);

router.put("/progress/:startupId", updateStartupProgress);

router.put("/invest/:startupId", addInvestorInterest);

router.get("/details/:startupId", getStartupDetails);

router.get("/search", searchStartups);

router.get("/founder/:founderId", getFounderStartups);

module.exports = router;