export type ProductCategory =
  | 'Writing'
  | 'Office Supplies'
  | 'Art Supplies'
  | 'Educational'
  | 'Technology';

export type Product = {
  name: string;
  brand: string;
  price: number;
  category: ProductCategory;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
