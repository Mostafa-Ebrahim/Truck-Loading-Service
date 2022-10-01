const Truck = require('../models/truck');
const Parcel = require('../models/parcel');

exports.getTrucks = async (req, res, next) => {
  const trucks = await Truck.findAll()
  await res.status(200).json(trucks);
};

exports.getTruck = async (req, res, next) => {
  const id = req.query.id;

  const truck = await Truck.findByPk(id);
  const parcels = await Parcel.findAll({ where: { truckId: id } });
  let totalWeight = truck.weight;
  let totalParcels = parcels.length;

  parcels.forEach(parcel => {
    totalWeight += parcel.weight;
  });
  await res.status(200).json({ truck, parcels, totalWeight, totalParcels });
};

exports.getParcels = async (req, res, next) => {
  const parcels = await Parcel.findAll();
  await res.status(200).json(parcels);
};

exports.createTruck = async (req, res, next) => {
  const weight = req.body.weight;

  const truck = await Truck.create({
    weight: weight
  });
  await res.status(201).json({
    message: 'Truck created successfully!',
    truck
  });
};

exports.createParcel = async (req, res, next) => {
  const weight = req.body.weight;
  const truckId = req.body.truckId;

  const parcel = await Parcel.create({
    weight: weight,
    truckId: truckId
  });
  await res.status(201).json({
    message: 'Parcel created successfully!',
    parcel
  });
};

exports.deleteTruck = async (req, res, next) => {
  const truck_id = req.body.id;

  const truck = await Truck.findByPk(truck_id);
  await truck.destroy();
  await res.status(200).json({
    message: 'truck has been deleted and unload the parcels successfully!'
  });
};

exports.deleteParcel = async (req, res, next) => {
  const parcel_id = req.body.id;

  const parcel = await Parcel.findByPk(parcel_id)
  await parcel.destroy();
  await res.status(200).json({
    message: 'parcel has been deleted successfully!'
  });
};

exports.loadParcel = async (req, res, next) => {
  const truck_id = req.body.truck_id;
  const parcel_id = req.body.parcel_id;

  const parcel = await Parcel.findByPk(parcel_id);
  await parcel.update({ truckId: truck_id });
  await res.status(200).json({
    message: 'parcel has been loaded successfully!'
  });
};

exports.unloadParcel = async (req, res, next) => {
  const parcel_id = req.body.parcel_id;

  const parcel = await Parcel.findByPk(parcel_id);
  await parcel.update({ truckId: null });
  await res.status(200).json({
    message: 'parcel has been unloaded successfully!'
  });
};

exports.unloadTruck = async (req, res, next) => {
  const truck_id = req.body.truck_id;

  const parcels = await Parcel.findAll({ where: { truckId: truck_id } });
  await parcels.forEach(parcel => {
    parcel.update({ truckId: null });
  });
  await res.status(200).json({
    message: 'parcels has been unloaded successfully!'
  });
};