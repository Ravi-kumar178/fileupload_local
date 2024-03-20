const express = require("express");
const router = express.Router();

//import controller
const {localFileUpload, imageUploader} = require("../Controller/fileUpload");

router.post("/localFileUpload",localFileUpload);
router.post("/imageUploader",imageUploader);

module.exports = router;