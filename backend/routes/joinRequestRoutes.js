const express = require("express");
const router = express.Router();

const {
  createJoinRequest,
  getStartupJoinRequests,
  acceptJoinRequest,
  rejectJoinRequest,
  voteJoinRequest,
  getProfessionalJoinRequests
} = require("../controllers/joinRequestController");

router.post("/", createJoinRequest);
router.get("/startup/:startupId", getStartupJoinRequests);
router.get("/professional/:professionalId", getProfessionalJoinRequests);
router.put("/accept/:requestId", acceptJoinRequest);
router.put("/reject/:requestId", rejectJoinRequest);
router.put("/vote/:requestId", voteJoinRequest);

module.exports = router;