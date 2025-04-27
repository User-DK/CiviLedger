const express = require("express");
const router = express.Router();
const syncController = require("../controllers/syncController");
const viewController = require("../controllers/viewController");

// One upload endpoint per table
router.post("/upload/tpa", syncController.uploadTPA);
router.post("/upload/testing", syncController.uploadTesting);
router.post("/upload/consultancy", syncController.uploadConsultancy);

module.exports = router;
