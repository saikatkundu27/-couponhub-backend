const Coupon = require("../models/coupon.model");

exports.getSalesCount = (type) =>
  new Promise((resolve, reject) => {
    Coupon.aggregate([
      { $group: { _id: { $toUpper: `$${type}` }, count: { $sum: 1 } } },
    ])
      .then((data) => resolve(data.map((item) => ({ [item._id]: item.count }))))
      .catch((err) => reject(err));
  });
