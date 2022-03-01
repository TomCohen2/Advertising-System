const express = require("express");
const router = express.Router();

const { getAdminDetails, putUpdateAdmin } = require("../controllers/admin");

router.get("/", getAdminDetails);

router.put("/:id", putUpdateAdmin);

// router.post("/", postCreateAdmin);

module.exports = router;
