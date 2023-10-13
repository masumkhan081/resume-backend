const obj = require("../data-tier/settings");
const { unitModel } = require("../models");
const checkExistence = require("./existence");
//

async function renderUnits(req, res) {
  const { pagenumb } = req.query;

  let skip = 0;
  if (pagenumb) {
    skip = obj.limit * pagenumb - obj.limit;
  }

  let count = await unitModel.count();
  unitModel
    .find()
    .sort({ $natural: -1 })
    .limit(obj.limit)
    .skip(skip)
    .then((units) => {
      res.status(200).send({
        units,
        count,
        skip,
        limit: obj.limit,
      });
    })
    .catch((err) => {
      res.send(obj.msg_err_load + "  err: " + err);
    });
}

async function createAndSave(req, res) {
  const { name } = req.body;
  (await unitModel.findOne({ name }))
    ? res.status(400).send({ message: "Already exist" })
    : (await new unitModel({
        name,
      }).save())
    ? res.status(200).send({ message: "Saved successfully" })
    : res.status(400).send({ message: "Error saving new unit" });
}

async function handleUpdate(req, res) {
  const { id, name } = req.body;
  (await unitModel.findByIdAndUpdate(id, { name }))
    ? res.status(200).send({ message: "Updated successfully" })
    : res.status(400).send({ message: "Error in update" });
}

async function handleDelete(req, res) {
  const { id } = req.params;
  (await unitModel.findByIdAndDelete(id))
    ? res.status(200).send({ message: "Deleted successfully" })
    : res.status(400).send({ message: "Error in deletion" });
}

async function getById(unitId) {
  return await unitModel
    .findById(unitId)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
}

async function getUnits(skip, limit) {
  return await unitModel
    .find()
    .limit(limit)
    .skip(skip)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
}

const mfrFunctions = {
  renderUnits,
  getById,
  handleUpdate,
  handleDelete,
  createAndSave,
  getUnits,
};
module.exports = mfrFunctions;
