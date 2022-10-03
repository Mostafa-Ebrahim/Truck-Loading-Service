const express = require('express');

const apiController = require('../controllers/api');

const router = express.Router();

router.get('/trucks', apiController.getTrucks);

router.get('/parcels', apiController.getParcels);

router.get('/truck', apiController.getTruck);

router.post('/truck', apiController.createTruck);

router.post('/parcel', apiController.createParcel);

router.delete('/truck', apiController.deleteTruck);

router.delete('/parcel', apiController.deleteParcel);

router.put('/load', apiController.loadParcel);

router.put('/unload-truck', apiController.unloadTruck);

router.put('/unload-parcel', apiController.unloadParcel);

module.exports = router;