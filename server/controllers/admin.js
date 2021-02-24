const Order = require("../models/order");
// const User = require("../models/user");

exports.orders = async (req, res) => {
  let NUMBER_OF_ORDERS = 15;

  let allOrders = await Order.find({})
    .skip(NUMBER_OF_ORDERS * (parseInt(req.params.countPagination) - 1))
    .limit(NUMBER_OF_ORDERS)
    .populate("products.product")
    .sort("-createdAt")
    .exec();

  res.json(allOrders);
};

exports.ordersCount = async (req, res) => {
  let totalOrder = await Order.find({}).estimatedDocumentCount().exec();
  res.json(totalOrder);
};

exports.orderStatus = async (req, res) => {
  // console.log(req.body);
  // return;
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  res.json(updated);
};

exports.orderStatuses = async (req, res) => {
  let NUMBER_OF_ORDERS = 15;

  let OrderStatuses = req.params.Status;
  let allOrders;
  var Statues;

  switch (OrderStatuses) {
    case "NotProcessed":
      Statues = "Not Processed";
      break;

    case "CashOnDelivery":
      Statues = "Cash On Delivery";
      break;

    case "processing":
      Statues = "Processing";
      break;

    case "Dispatched":
      Statues = "Dispatched";
      break;

    case "Cancelled":
      Statues = "Cancelled";
      break;

    case "Completed":
      Statues = "Completed";
      break;
  }

  allOrders = await Order.find({ orderStatus: Statues })
    .skip(NUMBER_OF_ORDERS * (parseInt(req.params.countPagination) - 1))
    .limit(NUMBER_OF_ORDERS)
    .populate("products.product")
    .sort("-createdAt")
    .exec();

  res.json(allOrders);
};
