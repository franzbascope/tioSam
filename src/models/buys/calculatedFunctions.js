const params = require("../../utils/params");

costDollars = (buy) => {
    if (buy.products) {
        let total = 0;
        for (let product of buy.products) {
            total += product.cost_dollars * product.quantity;
        }
        return total + buy.taxes;
    }
    return 0;
},

    addName = (buy) => {
        return `${buy.location} ${buy.date.toLocaleString()}`;
    }

costBs = (buy) => {
    return buy.cost_dollars * params.exchange_rate;
}

totalWeightKg = (buy) => {
    if (buy.products) {
        let total = 0;
        for (let product of buy.products) {
            total += product.weight * product.quantity;
        }
        return total / params.gramsInKg;
    }
    return 0;
}

addProperties = (buy) => {
    buy.total_weight_kg = totalWeightKg(buy)
    buy.cost_dollars = costDollars(buy)
    buy.cost_bs = costBs(buy)
    buy.name = addName(buy)

    return buy
}

module.exports = { addProperties };