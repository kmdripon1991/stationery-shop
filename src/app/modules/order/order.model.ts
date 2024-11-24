import { model, Schema } from 'mongoose';
import { Order } from './order.interface';
import { ProductModel } from '../product/product.model';

const orderSchema = new Schema<Order>(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Email address is required'],
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address.'],
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      min: [1, 'Quantity must be at least 1.'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required.'],
      min: [0, 'Total price must be a positive number.'],
      validate: {
        validator: async function (value: number) {
          const product = await ProductModel.findById(this.product);
          if (!product) {
            return false;
          }
          const total = product.price * this.quantity;
          return value === total;
        },
        message: 'Total price does not match',
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const OrderModel = model<Order>('Order', orderSchema);
