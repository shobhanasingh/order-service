const express = require("express");
const router = express.Router();
const verifyToken = require("../Middlewares/verifyToken");
const verifyAdmin = require("../Middlewares/verifyAdmin");
const orderController = require("../Controllers/order.controller");
router.post("/order", verifyToken, orderController.postOrder);
router.get("/orders", verifyToken, orderController.getOrder);
router.get(
  "/admin/orders",
  verifyToken,
  verifyAdmin,
  orderController.getAllOrderByAdmin,
);
router.get("/order/:id", verifyToken, orderController.getOrderById);
router.put("/order/:id", verifyToken, orderController.updateOrder);
router.put(
  "/admin/order/:id",
  verifyToken,
  verifyAdmin,
  orderController.updateStatus,
);

module.exports = router;
