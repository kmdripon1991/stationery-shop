import { Schema, model } from 'mongoose';
import { Product } from './product.interface';

const ProductCategoryEnum = [
  'Writing',
  'Office Supplies',
  'Art Supplies',
  'Educational',
  'Technology',
];

const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required.'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand name is required.'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
      min: [0, 'Price must be a positive number.'],
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
      enum: {
        values: ProductCategoryEnum,
        message:
          'Category must be one of Writing, Office Supplies, Art Supplies, Educational, or Technology.',
      },
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
      maxlength: [500, 'Description cannot exceed 500 characters.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      min: [0, 'Quantity cannot be negative.'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'InStock field is required.'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const ProductModel = model<Product>('Product', productSchema);
