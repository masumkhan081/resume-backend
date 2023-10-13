const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Brand = mongoose.model(
  "brands",
  new Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
    genericId: {
      type: Schema.Types.ObjectId,
      ref: "generics",
      required: true,
    },
    mfrId: {
      type: Schema.Types.ObjectId,
      ref: "manufacturers",
      required: true,
    },
  })
);
//
const Drug = mongoose.model(
  "stock",
  new Schema({
    drugId: {
      type: Schema.Types.ObjectId,
      ref: "drugs",
      required: true,
    },
    formulationId: {
      type: Schema.Types.ObjectId,
      ref: "formulations",
      required: true,
    },
    strength: {
      type: Number,
      required: true,
    },
    unitId: {
      type: Schema.Types.ObjectId,
      ref: "units",
      required: true,
    },
    available: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
  })
);

const Generic = mongoose.model(
  "generics",
  new Schema({
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "groups",
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
  })
);

const Group = mongoose.model(
  "groups",
  new Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
  })
);

const Formulation = mongoose.model(
  "formulations",
  new Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
  })
);

const Unit = mongoose.model(
  "units",
  new Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
  })
);

const MFR = mongoose.model(
  "manufacturers",
  new Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
  })
);

const Sale = mongoose.model(
  "sales",
  new Schema({
    saleAt: {
      type: Date,
      required: true,
    },
    drugs: [
      {
        stockId: {
          type: Schema.Types.ObjectId,
          ref: "stock",
          required: true,
        },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
      },
    ],
    bill: {
      type: Number,
      required: true,
    },
  })
);

const Purchase = mongoose.model(
  "purchase",
  new Schema({
    purchaseAt: {
      type: Date,
      required: true,
    },
    drugs: [
      {
        stockId: {
          type: Schema.Types.ObjectId,
          ref: "stock",
        },
        quantity: { type: Number, required: true },

        unitPrice: { type: Number, required: true },
      },
    ],
    bill: {
      type: Number,
      required: true,
    },
  })
);

const User = mongoose.model(
  "users",
  Schema({
    name: {
      type: String,
      min: 4,
      max: 100,
      required: true,
    },
    email: {
      type: String,
      min: 25,
      max: 200,
      required: true,
    },
    role: {
      type: String,
      min: 25,
      max: 200,
      enum: ["admin", "manager", "pharmacist", "salesman"],
      default: "salesman",
      required: true,
    },
    password: {
      type: String,
      min: 6,
      max: 1024,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  })
);

//
module.exports = {
  User,
  Group,
  Drug,
  Generic,
  Brand,
  Formulation,
  Unit,
  MFR,
  Sale,
  Purchase,
};
