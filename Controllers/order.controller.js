const OrdersCollection = require("../models/order.model");
const getOrderTotalPrice = require("../utils/utils");
const axios = require("axios");

exports.postOrder = async (req, res) => {
  const { products } = req.body;
  const orderProduct = [];
  let totalPrice = 0;
  try {
    for (const item of products) {
      const response = await axios.get(
        `http://localhost:4002/product/${item.productId}/`,
      );
      const productDetail = response.data.product;
      if (!productDetail) continue;
      const singleItem = {
        productId: productDetail._id,
        productName: productDetail.name,
        quantity: item.quantity,
        price: productDetail.price,
      };
      totalPrice += singleItem.quantity * singleItem.price;
      orderProduct.push(singleItem);
    }
    if (orderProduct.length === 0) {
      return res
        .status(400)
        .json({ message: "No valid products found in order." });
    }
    const newOrder = await OrdersCollection.create({
      userId: req.userId,
      products: orderProduct,
      totalPrice,
    });
    res
      .status(201)
      .json({ message: "Your order is successfully placed!", newOrder });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Your order can not be placed", err });
  }
};

exports.getOrder = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const filter = { userId: req.userId };
  try {
    const totalitems = await OrdersCollection.countDocuments(filter);
    const orders = await OrdersCollection.find(filter).limit(limit).skip(skip);
    res.status(200).json({
      TotalItem: totalitems,
      TotalPage: Math.ceil(totalitems / limit),
      currentPage: page,
      orders,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error!!" });
  }
};

exports.getOrderById = async (req, res) => {
  const orderId = req.params.id;
  const userId = req.userId;
  try {
    const order = await OrdersCollection.findOne({ _id: orderId, userId });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or unauthorized." });
    }
    res.status(200).json(order);
  } catch (e) {
    res.status(500).json({ message: "Server Error!!!" });
  }
};

exports.updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const userId = req.userId;
  const { products } = req.body;
  let updatedTotalPrice = 0;
  try {
    for (const item of products) {
      const orderDoc = await OrdersCollection.findOne(
        {
          _id: orderId,
          "products.productId": item.productId,
          userId,
        },
        { "products.$": 1 },
      );
      const unitPrice = orderDoc.products[0].price;

      const updatedQuantity = item.quantity;
      updatedTotalPrice += getOrderTotalPrice(unitPrice, updatedQuantity);
      await OrdersCollection.findOneAndUpdate(
        {
          _id: orderId,
          userId,
          "products.productId": item.productId,
        },
        {
          $set: {
            "products.$.quantity": updatedQuantity,
          },
        },
        { new: true },
      );
    }
    const updatedOrder = await OrdersCollection.findOneAndUpdate(
      { _id: orderId, userId },
      {
        $set: {
          totalPrice: updatedTotalPrice,
        },
      },
      { new: true },
    );
    res
      .status(201)
      .json({ message: "Your order is successfully updated!!", updatedOrder });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Server Error!!", err });
  }
};

exports.getAllOrderByAdmin = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  try {
    const countItems = await OrdersCollection.countDocuments();
    const orders = await OrdersCollection.find().limit(limit).skip(skip);
    res.status(200).json({
      TotalItem: countItems,
      TotalPage: Math.ceil(countItems / limit),
      CurrentPage: page,
      orders,
    });
  } catch (err) {
    console.log(`error:${err}`);
    res.status(500).json({ message: "Server Error!!" });
  }
};
//Update status
exports.updateStatus = async (req, res) => {
  const orderStatus = req.body;
  const orderId = req.params.id;
  try {
    const updateOrder = await OrdersCollection.findOneAndUpdate(
      { _id: orderId },
      orderStatus,
      { new: true },
    );
    res
      .status(201)
      .json({ message: `${orderId} is successfully updated!!`, updateOrder });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ message: "Server Error!!" }, err);
  }
};
