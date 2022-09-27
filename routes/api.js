const express = require('express');

const apiController = require('../controllers/api');

const router = express.Router();

router.get('/get/trucks', apiController.getTrucks);

router.get('/get/parcels', apiController.getParcels);

router.post('/create/truck', apiController.createTruck);

router.post('/create/parcel', apiController.createParcel);

router.delete('/delete/truck', apiController.deleteTruck);

router.delete('/delete/parcel', apiController.deleteParcel);

router.put('/load', apiController.loadParcel);

router.put('/unload/parcel', apiController.unloadParcel);

router.put('/unload/truck', apiController.unloadTruck);

module.exports = router;