const express = require("express");
const { register, login, captureNetworkRequests } = require("../controllers/User");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.use("/carInfo", captureNetworkRequests);

module.exports = router;
