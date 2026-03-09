const express = require("express");
const router = express.Router();

const {
  createMentorRequest,
  getRequestsForMentor,
  getRequestsForFounder,
  acceptMentorRequest,
  rejectMentorRequest
} = require("../controllers/mentorRequestController");

router.post("/", createMentorRequest);

router.get("/mentor/:mentorId", getRequestsForMentor);
router.get("/founder/:founderId", getRequestsForFounder);

router.put("/accept/:requestId", acceptMentorRequest);
router.put("/reject/:requestId", rejectMentorRequest);

module.exports = router;