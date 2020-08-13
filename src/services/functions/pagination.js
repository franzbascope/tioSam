const paginateModel = async ({model, query, page, limit}) => {
    let options = {
        page: page,
        limit: limit,
        collation: {
          locale: "en",
        },
      };    
      return await model.paginate(query, options, function (err, result) {
        if(result){
            return {response: result.docs, next: result.hasNextPage, page: result.nextPage};
        } else {
            return `Error: ${err}`;
        }
      });
}

module.exports = { paginateModel };