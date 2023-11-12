const express = require('express');
const router = express.Router();

const {index,addVehicle,vehicleDetail,modifyVehicleDetail,vehicleDelete} =require("../controllers/controllerFunction")
router.route("/").get(index);

router.route("/addVehicle").post(addVehicle);
router.route("/vehicleDetail").get(vehicleDetail);
router.route("/modifyVehicleDetail").post(modifyVehicleDetail);
router.route("/deleteVehicle").post(vehicleDelete);


module.exports = router;
