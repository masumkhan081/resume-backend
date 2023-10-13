const { groupModel } = require("../models");
const checkExistence = require("./existence");
const { setGroups } = require("./generic");
const obj = require("../data-tier/settings");
//

async function renderGroups(req, res) {
  const { pagenumb } = req.query;
  let skip = 0;
  if (pagenumb) {
    skip = obj.limit * pagenumb - obj.limit;
  }
  let count = await groupModel.count();
  let msg = "";
  groupModel
    .find()
    .sort({ $natural: -1 })
    .limit(obj.limit)
    .skip(skip)
    .then((data) => {
      res.send({
        groups: data,
        msg,
        count,
        skip,
        authstatus: false,
        limit: obj.limit,
      });
    })
    .catch((err) => {
      res.send(err);
    });
}

async function createAndSave(req, res) {
  const { name } = req.body;
  (await groupModel.findOne({ name }))
    ? res.status(400).send({ message: "Already exist" })
    : (await new groupModel({
        name,
      }).save())
    ? res.status(200).send({ message: "Saved successfully" })
    : res.status(400).send({ message: "Error saving new unit" });
}

async function handleUpdate(req, res) {
  const { id, name } = req.body;
  (await groupModel.findByIdAndUpdate(id, { name }))
    ? res.status(200).send({ message: "Updated successfully" })
    : res.status(400).send({ message: "Error in update" });
}

async function handleDelete(req, res) {
  const { id } = req.params;
  (await groupModel.findByIdAndDelete(id))
    ? res.status(200).send({ message: "Deleted successfully" })
    : res.status(400).send({ message: "Error in deletion" });
}

async function getGroups(skip, limit) {
  return await groupModel
    .find()
    .sort({ $natural: -1 })
    .limit(limit)
    .skip(skip)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
}
const grpFunctions = {
  createAndSave,
  handleDelete,
  handleUpdate,
  getGroups,
  renderGroups,
};
module.exports = grpFunctions;
