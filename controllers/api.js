const Truck = require('../models/truck');
const Parcel = require('../models/parcel');

exports.getTrucks = (req, res, next) => {
  Truck.findAll()
    .then(trucks => {
      res.status(200).json(trucks);
    })
    .catch(err => console.log(err));
};

exports.getParcels = (req, res, next) => {
  Parcel.findAll()
    .then(parcels => {
      res.status(200).json(parcels);
    })
    .catch(err => console.log(err));
};

exports.createTruck = (req, res, next) => {
  const weight = req.body.weight;

  Truck.create({
    weight: weight
  })
    .then(truck => {
      res.status(201).json({
        message: 'Truck created successfully!',
        truck
      })
    })
    .catch(err => console.log(err));
};

exports.createParcel = (req, res, next) => {
  const weight = req.body.weight;
  const truckId = req.body.truckId;

  Parcel.create({
    weight: weight,
    truckId: truckId
  })
    .then(parcel => {
      res.status(201).json({
        message: 'Parcel created successfully!',
        parcel
      })
    })
    .catch(err => console.log(err));
};

exports.deleteTruck = (req, res, next) => {
  const truck_id = req.body.id;
  Truck.findByPk(truck_id)
    .then(truck => {
      truck.destroy();
    })
    .then(result => {
      res.status(200).json({
        message: 'truck has been deleted and unload the parcels successfully!'
      })
    })
    .catch(err => console.log(err));
};

exports.deleteParcel = (req, res, next) => {
  const parcel_id = req.body.id;
  Parcel.findByPk(parcel_id)
    .then(parcel => {
      parcel.destroy();
    })
    .then(result => {
      res.status(200).json({
        message: 'parcel has been deleted successfully!'
      })
    })
    .catch(err => console.log(err));
};

exports.loadParcel = (req, res, next) => {
  const truck_id = req.body.truck_id;
  const parcel_id = req.body.parcel_id;

  Parcel.findByPk(parcel_id)
    .then(parcel => {
      parcel.update({ truckId: truck_id })
    })
    .then(result => {
      res.status(200).json({
        message: 'parcel has been loaded successfully!'
      })
    })
    .catch(err => console.log(err));
};

exports.unloadParcel = (req, res, next) => {
  const parcel_id = req.body.parcel_id;

  Parcel.findByPk(parcel_id)
    .then(parcel => {
      parcel.update({ truckId: null })
    })
    .then(result => {
      res.status(200).json({
        message: 'parcel has been unloaded successfully!'
      })
    })
    .catch(err => console.log(err));
};

exports.unloadTruck = (req, res, next) => {
  const truck_id = req.body.truck_id;

  Parcel.findAll({ where: { truckId: truck_id } })
    .then(parcels => {
      parcels.forEach(parcel => {
        parcel.update({ truckId: null });
      });
    })
    .then(result => {
      res.status(200).json({
        message: 'parcels has been unloaded successfully!'
      })
    })
    .catch(err => console.log(err));
};