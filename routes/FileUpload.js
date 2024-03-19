const express = require("express");
const router = express.Router();

//import controller
const {localFileUpload} = require("../Controller/fileUpload");

router.post("/localFileUpload",localFileUpload);

module.exports = router;