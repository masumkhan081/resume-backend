import { entities } from "../config/constants.js";
import purchaseService from "../services/purchase.service.js";
import { sendFetchResponse } from "../utils/responseHandler.js";
import { TypeController } from "../types/requestResponse.js";
//

export const getPurchases: TypeController = async (req, res) => {
  try {
    const result = await purchaseService.getPurchases(req.query);
    sendFetchResponse({ res, result, entity: entities.purchase });
  } catch (error) {
    console.error(error);
    // sendErrorResponse({
    //   res,
    //   error,
    //   what: entities.category,
    // });
  }
};

export const getSinglePurchase: TypeController = async (req, res) => {
  try {
    const result = await purchaseService.getSinglePurchase(req.params.id);
    sendFetchResponse({ res, result, entity: entities.purchase });
  } catch (error) {
    console.error(error);
    // sendErrorResponse({
    //   res,
    //   error,
    //   what: entities.category,
    // });
  }
};

export const createPurchase: TypeController = async (req, res) => {
  try {
    const result = await purchaseService.createPurchase(req.body);
    sendFetchResponse({ res, result, entity: entities.purchase });
  } catch (error) {
    console.error(error);
    // sendErrorResponse({
    //   res,
    //   error,
    //   what: entities.category,
    // });
  }
};

export const updatePurchase: TypeController = async (req, res) => {
  try {
    const result = await purchaseService.updatePurchase({
      id: req.params.id,
      data: req.body,
    });
    sendFetchResponse({ res, result, entity: entities.purchase });
  } catch (error) {
    console.error(error);
    // sendErrorResponse({
    //   res,
    //   error,
    //   what: entities.category,
    // });
  }
};

export const deletePurchase: TypeController = async (req, res) => {
  try {
    const result = await purchaseService.deletePurchase(req.params.id);
    sendFetchResponse({ res, result, entity: entities.purchase });
  } catch (error) {
    console.error(error);
    // sendErrorResponse({
    //   res,
    //   error,
    //   what: entities.category,
    // });
  }
};

export default {
  getPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
};
