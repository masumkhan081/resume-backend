const {  Drug } = require("../models");

async function getDrugs(req, res) {
  const { pagenumb } = req.query;

  let skip = 0;
  if (pagenumb) {
    skip = obj.limit * pagenumb - obj.limit;
  }

  let count = await stockModel.count();
  let msg = searchObj.name ? `Searched for '${searchObj.name}'` : "plain--";

  Drug.find()
    .sort({ $natural: -1 })
    .limit(obj.limit)
    .skip(skip)
    .then((drugs) => {
      res.status(200).send({
        drugs,
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
  const { drugId, formulationId, strength, unitId, available, mrp } = req.body;

  (await Drug.findOne({ drugId, formulationId, strength, unitId }))
    ? res.status(400).send({ message: "Already exist" })
    : (await new Drug({
        drugId,
        formulationId,
        strength,
        unitId,
        available,
        mrp,
      }).save())
    ? res.status(200).send({ message: "Saved successfully" })
    : res.status(400).send({ message: "Error saving new unit" });
}

async function handleUpdate(req, res) {
  const { id, drugId, formulationId, strength, unitId, available, mrp } =
    req.body;
  (await Drug.findByIdAndUpdate(id, {
    drugId,
    formulationId,
    strength,
    unitId,
    available,
    mrp,
  }))
    ? res.status(200).send({ message: "Updated successfully" })
    : res.status(400).send({ message: "Error in update" });
}

async function handleDelete(req, res) {
  const { id } = req.params;
  (await Drug.findByIdAndDelete(id))
    ? res.status(200).send({ message: "Deleted successfully" })
    : res.status(400).send({ message: "Error in deletion" });
}

module.exports = { createAndSave, getDrugs, handleUpdate, handleDelete };
