const { Purchase } = require("../models");

async function getPurchases(req, res) {
  const { pagenumb } = req.query;

  let skip = 0;
  if (pagenumb) {
    skip = obj.limit * pagenumb - obj.limit;
  }

  let count = await stockModel.count();
  let msg = searchObj.name ? `Searched for '${searchObj.name}'` : "plain--";

  Purchase.find()
    .sort({ $natural: -1 })
    .limit(obj.limit)
    .skip(skip)
    .then((purchases) => {
      res.status(200).send({
        purchases,
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
  const { purchaseAt, drugs, bill } = req.body;

  (await new Purchase({
    purchaseAt,
    drugs,
    bill,
  }).save())
    ? res.status(200).send({ message: "Saved successfully" })
    : res.status(400).send({ message: "Error saving new unit" });
}

async function handleUpdate(req, res) {
  const { id, purchaseAt, drugs, bill } = req.body;
  (await Purchase.findByIdAndUpdate(id, {
    purchaseAt,
    drugs,
    bill,
  }))
    ? res.status(200).send({ message: "Updated successfully" })
    : res.status(400).send({ message: "Error in update" });
}

async function handleDelete(req, res) {
  const { id } = req.params;
  (await Purchase.findByIdAndDelete(id))
    ? res.status(200).send({ message: "Deleted successfully" })
    : res.status(400).send({ message: "Error in deletion" });
}

module.exports = { createAndSave, getPurchases, handleUpdate, handleDelete };
