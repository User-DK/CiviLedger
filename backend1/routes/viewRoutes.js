const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");

router.get("/tpa", viewController.getPaginatedTPA); // /api/view/tpa?page=1&limit=20
router.get("/testing", viewController.getPaginatedTesting); // /api/view/testing?page=1&limit=20
router.get("/consultancy", viewController.getPaginatedConsultancy); // /api/view/consultancy?page=1&limit=20
router.get("/tpa/:id", viewController.getTPAByID); // /api/view/tpa/1
router.get("/testing/:id", viewController.getTestingByID); // /api/view/testing/1
router.get("/consultancy/:id", viewController.getConsultancyByID); // /api/view/consultancy/1

module.exports = router;