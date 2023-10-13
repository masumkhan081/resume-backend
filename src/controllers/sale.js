const { Sale } = require("../models");

async function getSales(req, res) {
  const { pagenumb } = req.query;

  let skip = 0;
  if (pagenumb) {
    skip = obj.limit * pagenumb - obj.limit;
  }

  let count = await stockModel.count();
  let msg = searchObj.name ? `Searched for '${searchObj.name}'` : "plain--";

  Sale.find()
    .sort({ $natural: -1 })
    .limit(obj.limit)
    .skip(skip)
    .then((sales) => {
      res.status(200).send({
        sales,
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
  const { saleAt, drugs, bill } = req.body;

  (await new Sale({
    saleAt,
    drugs,
    bill,
  }).save())
    ? res.status(200).send({ message: "Saved successfully" })
    : res.status(400).send({ message: "Error saving new unit" });
}

async function handleUpdate(req, res) {
  const { id, saleAt, drugs, bill } = req.body;
  (await Sale.findByIdAndUpdate(id, {
    saleAt,
    drugs,
    bill,
  }))
    ? res.status(200).send({ message: "Updated successfully" })
    : res.status(400).send({ message: "Error in update" });
}

async function handleDelete(req, res) {
  const { id } = req.params;
  (await Sale.findByIdAndDelete(id))
    ? res.status(200).send({ message: "Deleted successfully" })
    : res.status(400).send({ message: "Error in deletion" });
}

module.exports = { createAndSave, getSales, handleUpdate, handleDelete };
