const express = require("express");
const router = express.Router();
const syncController = require("../controllers/syncController");
const viewController = require("../controllers/viewController");

// One upload endpoint per table
router.post("/upload/tpa", syncController.deleteTPA);
router.post("/upload/testing", syncController.deleteTesting);
router.post("/upload/consultancy", syncController.deleteConsultancy);
router.post("/upload/estimation", syncController.syncProcessEstimation); // New endpoint for Process_Estimation
router.post("/upload/estimationDetails", syncController.syncEstimationDetails); // New endpoint for EstimationDetails
router.post('/upload', syncController.uploadChanges);

module.exports = router;
