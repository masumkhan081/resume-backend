const obj = require("../data-tier/settings");
const { mfrModel } = require("../models");
const checkExistence = require("./existence");
//

async function renderMFR(req, res) {
  const { pagenumb } = req.query;
  let skip = 0;
  if (pagenumb) {
    skip = obj.limit * pagenumb - obj.limit;
  }

  let count = await mfrModel.count();
  mfrModel
    .find()
    .sort({ $natural: -1 })
    .limit(obj.limit)
    .skip(skip)
    .then((companies) => {
      res.send({
        companies,
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
  (await mfrModel.findOne({ name }))
    ? res.status(400).send({ message: "Already exist" })
    : (await new mfrModel({
        name,
      }).save())
    ? res.status(200).send({ message: "Saved successfully" })
    : res.status(400).send({ message: "Error saving new unit" });
}

async function handleUpdate(req, res) {
  const { id, name } = req.body;
  (await mfrModel.findByIdAndUpdate(id, { name }))
    ? res.status(200).send({ message: "Updated successfully" })
    : res.status(400).send({ message: "Error in update" });
}

async function handleDelete(req, res) {
  const { id } = req.params;
  (await mfrModel.findByIdAndDelete(id))
    ? res.status(200).send({ message: "Deleted successfully" })
    : res.status(400).send({ message: "Error in deletion" });
}

async function getById(mfrId) {
  return await mfrModel
    .findById(mfrId)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
}

async function getMFR(skip, limit) {
  return await mfrModel
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

const cmpFunctions = {
  getById,
  handleUpdate,
  handleDelete,
  createAndSave,
  renderMFR,
  getMFR,
};
module.exports = cmpFunctions;
