const mongoose = require("mongoose");
const { formulationModel, drugDetailModel } = require("../models");
const checkExistence = require("./existence");
const { render_now, limit } = require("../data-tier/settings");
const obj = require("../data-tier/settings");
//

async function renderFormulations(req, res, searchObj = { name: "" }) {
  const { pagenumb } = req.query;

  let skip = 0;
  if (pagenumb) {
    skip = obj.limit * pagenumb - obj.limit;
  }

  let count = await formulationModel.count();
  let msg = searchObj.name ? `Searched for '${searchObj.name}'` : "plain--";

  formulationModel
    .find()
    .sort({ $natural: -1 })
    .limit(obj.limit)
    .skip(skip)
    .then((formulations) => {
      res.status(200).send({
        formulations,
        msg,
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
  (await formulationModel.findOne({ name }))
    ? res.status(400).send({ message: "Already exist" })
    : (await new formulationModel({
        name,
      }).save())
    ? res.status(200).send({ message: "Saved successfully" })
    : res.status(400).send({ message: "Error saving new unit" });
}

async function handleUpdate(req, res) {
  const { id, name } = req.body;
  (await formulationModel.findByIdAndUpdate(id, { name }))
    ? res.status(200).send({ message: "Updated successfully" })
    : res.status(400).send({ message: "Error in update" });
}

async function handleDelete(req, res) {
  const { id } = req.params;
  (await formulationModel.findByIdAndDelete(id))
    ? res.status(200).send({ message: "Deleted successfully" })
    : res.status(400).send({ message: "Error in deletion" });
}

async function getFormulations(skip, limit) {
  return await formulationModel
    .find()
    .limit(limit)
    .skip(skip)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("error ki maki");
    });
}
module.exports = {
  handleDelete,
  handleUpdate,
  createAndSave,
  getFormulations,
  renderFormulations,
}; 
