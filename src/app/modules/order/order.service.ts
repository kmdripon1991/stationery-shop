import { ProductModel } from '../product/product.model';
import { Order } from './order.interface';
import { OrderModel } from './order.model';

const placeOrder = async (orderItem: Order) => {
  const product = await ProductModel.findById(orderItem.product);
  if (!product) {
    return 'Product not found';
  }
  if (product.quantity < orderItem.quantity) {
    return 'Insufficient product in stock';
  }

  const totalProductPrice = product.price * orderItem.quantity;
  if (totalProductPrice !== orderItem.totalPrice) {
    return 'invalid total price';
  }

  if (product.quantity === orderItem.quantity) {
    product.inStock = false;
  }
  product.quantity -= orderItem.quantity;
  await product.save();
  const createOrder = await OrderModel.create(orderItem);
  return createOrder;
};
const revenue = async () => {
  const total = await OrderModel.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'singleProductDetails',
      },
    },
    {
      $unwind: '$singleProductDetails',
    },
    {
      $addFields: {
        totalOrderPrice: {
          $multiply: ['$singleProductDetails.price', '$quantity'],
        },
      },
    },
    {
      $group: {
        _id: null,
        subTotal: { $sum: '$totalOrderPrice' },
      },
    },
  ]);
  return total;
};

export const OrderServices = {
  placeOrder,
  revenue,
};
