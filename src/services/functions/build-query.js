const { MongooseQueryParser } = require("mongoose-query-parser");
const parser = new MongooseQueryParser();

//example ?name=/Minox/&weight=weight>100
//example ?price_bs=<=140&weight=>50
//example ?name==/Minox/&price_bs=<=140&weight=>50

const buildQuery = (req) => {
  let query = "";
  let sep = "";
  for (let key in req.query) {
    let cond = req.query[key];
    query += sep + key + cond;
    sep = "&";
  }
  const rquery = parser.parse(query);

  return rquery.filter;
};

module.exports = { buildQuery };
