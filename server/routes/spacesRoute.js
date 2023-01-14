const router = require("express").Router();
const Space = require("../models/spaceModel");
const authMiddleware = require("../middlewares/authMiddleware");

//Route for adding the study space

router.post("/add-space", authMiddleware, async (req, res) => {
  try {
    const existingSpace = await Space.findOne({ SpaceID: req.body.SpaceID });
    if (existingSpace) {
      return res.status(200).send({
        success: false,
        message: "Study space already exists",
      });
    }
    const newSpace = new Space(req.body);
    await newSpace.save();
    return res.status(200).send({
      success: true,
      message: "Study Space added successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});
// Route for updating the study space

router.post("/update-space", authMiddleware, async (req, res) => {
  try {
    await Space.findByIdAndUpdate(req.body._id, req.body);
    return res.status(200).send({
      success: true,
      message: "Space updated successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Route for deleting the study space
router.post("/delete-space", authMiddleware, async (req, res) => {
  try {
    await Space.findByIdAndDelete(req.body._id);
    return res.status(200).send({
      success: true,
      message: "Space deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

//Route for getting all the available study spaces
router.post("/get-all-spaces", authMiddleware, async (req, res) => {
  try {
    const spaces = await Space.find(req.body);
    return res.status(200).send({
      success: true,
      message: "Spaces fetched successfully",
      data: spaces,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Getting study space by Space ID
router.post("/get-space-by-id", authMiddleware, async (req, res) => {
  try {
    const space = await Space.findById(req.body._id);
    return res.status(200).send({
      success: true,
      message: "Space fetched successfully",
      data: space,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
