const express = require("express");
const { getServerStatus } = require("../controllers/testController");

const router = express.Router();

router.get("/test", getServerStatus);

module.exports = router;
