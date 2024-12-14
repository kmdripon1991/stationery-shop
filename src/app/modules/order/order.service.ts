import { ProductModel } from '../product/product.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const placeOrder = async (orderItem: TOrder) => {
  const product = await ProductModel.findById(orderItem.product);
  if (!product) {
    throw new Error('Product not found');
  }

  if (product.quantity < orderItem.quantity) {
    throw new Error('Insufficient product in stock');
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
  const result = await OrderModel.aggregate([
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
    {
      $project: { _id: 0, subTotal: 1 },
    },
  ]);

  const totalRevenue = result.length > 0 ? result[0].subTotal : 0;
  return totalRevenue;
};

export const OrderServices = {
  placeOrder,
  revenue,
};
