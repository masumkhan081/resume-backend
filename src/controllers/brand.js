const obj = require("../data-tier/settings");
const { Drug, Brand } = require("../models");
//
async function getDrugs(req, res, searchObj = { name: "" }) {
  const { pagenumb } = req.query;

  let skip = 0;
  if (pagenumb) {
    skip = obj.limit * pagenumb - obj.limit;
  }

  let count = await Brand.count();
  let msg = searchObj.name ? `Searched for '${searchObj.name}'` : "plain--";

  Brand.find()
    .sort({ $natural: -1 })
    .limit(obj.limit)
    .skip(skip)
    .then((brands) => {
      res.status(200).send({
        brands,
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
  const { name, genericId, mfrId } = req.body;

  (await Brand.findOne({ name, genericId }))
    ? res.status(400).send({ message: "Already exist" })
    : (await new Brand({
        name,
        genericId,
        mfrId,
      }).save())
    ? res.status(200).send({ message: "Saved successfully" })
    : res.status(400).send({ message: "Error saving new unit" });
}

async function handleUpdate(req, res) {
  const { id, name, genericId } = req.body;
  (await Brand.findByIdAndUpdate(id, { name, genericId }))
    ? res.status(200).send({ message: "Updated successfully" })
    : res.status(400).send({ message: "Error in update" });
}

async function handleDelete(req, res) {
  const { id } = req.params;
  (await Brand.findByIdAndDelete(id))
    ? res.status(200).send({ message: "Deleted successfully" })
    : res.status(400).send({ message: "Error in deletion" });
}

module.exports = {
  createAndSave,
  getDrugs,
  handleUpdate,
  handleDelete,
};
