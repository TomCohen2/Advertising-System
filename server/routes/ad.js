// routes/ad.js
const express = require("express");
const router = express.Router();

const {
  getAllAd,
  postCreateAd,
  putUpdateAd,
  deleteAd,
} = require("../controllers/ad");

/**
 * @route GET api/ad
 * @description get all ad
 * @access public
 */
router.get("/", getAllAd);

/**
 * @route POST api/ad
 * @description add a new ad
 * @access public
 */
router.post("/", postCreateAd);

/**
 * @route PUT api/ad/:id
 * @description update ad
 * @access public
 */
router.put("/:id", putUpdateAd);

/**
 * @route DELETE api/ad/:id
 * @description delete ad
 * @access public
 */
router.delete("/:id", deleteAd);

module.exports = router;
