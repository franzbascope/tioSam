const params = require("../../utils/params");

const getValueBs = (importation) => {
  return params.exchange_rate * importation.value_dollars;
};

const getShippingCostDollars = (importation) => {
  if (importation.shipping_real_kg)
    return params.price_kg * importation.shipping_real_kg;
  return 0;
};

const getValueDollars = async (importation) => {
  let value_dollars = 0;
  for (let buy of importation.buys) {
    try {
      value_dollars += buy.cost_dollars;
    } catch (e) {
      throw new Error(e);
    }
  }
  return value_dollars;
};

const getShippingEstimatedKg = async (importation) => {
  let shipping_estimated_kg = 0;
  for (let buy of importation.buys) {
    try {
      shipping_estimated_kg += buy.total_weight_kg;
    } catch (e) {
      throw new Error(e);
    }
  }
  return shipping_estimated_kg;
};

const addProperties = async (importation) => {
  importation.shipping_estimated_kg = await getShippingEstimatedKg(importation);
  importation.shipping_cost_dollars = getShippingCostDollars(importation);
  importation.value_dollars = await getValueDollars(importation);
  importation.value_bs = getValueBs(importation);

  return importation;
};

module.exports = { addProperties };
