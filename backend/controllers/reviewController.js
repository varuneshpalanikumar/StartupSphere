const Review = require("../models/Review");
const Startup = require("../models/Startup");

exports.addReview = async (req, res) => {
  try {

    const { startupId, mentorId, rating, comment } = req.body;

    const startup = await Startup.findById(startupId);

    if (!startup) {
      return res.status(404).json({
        message: "Startup not found"
      });
    }

    if (!startup.mentorReviewRequested) {
      return res.status(403).json({
        message: "Mentor review not requested for this startup"
      });
    }

    const review = new Review({
      startup: startupId,
      mentor: mentorId,
      rating,
      comment
    });

    await review.save();

    res.status(201).json({
      message: "Review added successfully",
      review
    });

  } catch (error) {

    res.status(500).json({
      message: "Error adding review",
      error
    });

  }
};
exports.getStartupReviews = async (req, res) => {
  try {

    const { startupId } = req.params;

    const reviews = await Review.find({ startup: startupId })
      .populate("mentor", "name email");

    res.status(200).json(reviews);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching reviews",
      error
    });

  }
};