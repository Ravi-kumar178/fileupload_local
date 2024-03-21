const express = require("express");
const router = express.Router();

//import controller
const {localFileUpload, imageUploader , videoUploader, compressImage} = require("../Controller/fileUpload");

router.post("/localFileUpload",localFileUpload);
router.post("/imageUploader",imageUploader);
router.post("/videoUploader",videoUploader);
router.post("/compressImage", compressImage);

module.exports = router;