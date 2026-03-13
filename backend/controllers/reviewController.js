const Review = require("../models/Review");
const Startup = require("../models/Startup");

exports.addReview = async (req, res) => {
  try {
    const { startupId, mentorId, rating, comment } = req.body;

    const startup = await Startup.findById(startupId);

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: "Startup not found"
      });
    }

    if (!startup.mentorReviewRequested) {
      return res.status(403).json({
        success: false,
        message: "Mentor review not requested for this startup"
      });
    }

    const existingReview = await Review.findOne({
      startup: startupId,
      mentor: mentorId
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a review for this startup"
      });
    }

    const review = new Review({
      startup: startupId,
      mentor: mentorId,
      rating,
      comment
    });

    await review.save();

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error submitting review",
      error: error.message
    });
  }
};

exports.getStartupReviews = async (req, res) => {
  try {
    const { startupId } = req.params;

    const reviews = await Review.find({ startup: startupId })
      .populate("mentor", "name email");

    return res.status(200).json({
      success: true,
      reviews
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message
    });
  }
};