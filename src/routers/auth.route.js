const { Router } = require("express");
const authController = require("../controllers/auth.controller");

const router = Router();

router.post("/auth/login", authController.userLogin);

module.exports = router;