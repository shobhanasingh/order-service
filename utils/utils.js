function getOrderTotalPrice(unitPrice, quantity) {
  unitPrice = Number(unitPrice);
  quantity = Number(quantity);

  if (isNaN(unitPrice) || isNaN(quantity)) {
    throw new Error(
      `Invalid number(s): unitPrice=${unitPrice}, quantity=${quantity}`,
    );
  }

  return unitPrice * quantity;
}
module.exports = getOrderTotalPrice;
