const express = require("express");
const router = express.Router();

const { addReview, getStartupReviews } = require("../controllers/reviewController");

router.post("/add", addReview);

router.get("/startup/:startupId", getStartupReviews);

module.exports = router;