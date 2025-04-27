const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");

router.get("/tpa", viewController.getPaginatedTPA); // /api/view/tpa?page=1&limit=20
router.get("/testing", viewController.getPaginatedTesting); // /api/view/testing?page=1&limit=20
router.get("/consultancy", viewController.getPaginatedConsultancy); // /api/view/consultancy?page=1&limit=20
router.get("/tpa/:id", viewController.getTPAByID); // /api/view/tpa/1
router.get("/testing/:id", viewController.getTestingByID); // /api/view/testing/1
router.get("/consultancy/:id", viewController.getConsultancyByID); // /api/view/consultancy/1


// New endpoints for Process_Estimation and EstimationDetails
router.get("/estimation", viewController.getPaginatedEstimation); // /api/view/estimation?page=1&limit=20
router.get("/estimation/:id", viewController.getEstimationByID); // /api/view/estimation/1
router.get("/estimationDetails/:party_id", viewController.getEstimationDetailsByParty); // /api/view/estimationDetails/1

// router.get("/excel/testing", viewController.downloadTestingExcel);
// router.get("/excel/tpa", viewController.downloadTPAExcel);
// router.get("/excel/consultancy", viewController.downloadConsultancyExcel);
router.get('/excel/testing', viewController.exportTestingExcel);
router.get('/excel/consultancy', viewController.exportConsultancyExcel); 
router.get('/excel/tpa', viewController.exportTPAExcel);
router.get('/excel/estimation', viewController.exportEstimationExcel); // Export Process_Estimation to Excel
router.get('/excel/estimationDetails', viewController.exportEstimationDetailsExcel); // Export EstimationDetails to Excel
module.exports = router;