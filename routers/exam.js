const express = require("express");
const router = express.Router();
const { newExam } = require("../controllers/examController");

router.post("/",newExam);

module.exports = router;