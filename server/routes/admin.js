const express = require("express");
const { auth } = require("../firebase");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

const {
  orders,
  orderStatus,
  ordersCount,
  orderStatuses,
} = require("../controllers/admin");

// routes
router.get("/admin/orders/:countPagination", authCheck, adminCheck, orders);
router.get("/admin/orderCount", authCheck, adminCheck, ordersCount);
router.get(
  "/admin/orderStatus/:Status/:countPagination",
  authCheck,
  adminCheck,
  orderStatuses
);
router.put("/admin/order-status", authCheck, adminCheck, orderStatus);

module.exports = router;
