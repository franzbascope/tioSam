const { limit } = require("../../utils/params");
const paginateModel = async ({ model, query, page }) => {
  let options = {
    page: page,
    limit: limit,
    collation: {
      locale: "en",
    },
  };
  return await model.paginate(query, options, function (err, result) {
    if (result) {
      return {
        response: result.docs,
        nextPage: result.nextPage,
        prevPage: result.prevPage,
        hasNext: result.hasNextPage,
        hasPrev: result.hasPrevPage,
        totalPages: result.totalPages
      };
    } else {
      return `Error: ${err}`;
    }
  });
};

module.exports = { paginateModel };
