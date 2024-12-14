export type TProductCategory =
  | 'Writing'
  | 'Office Supplies'
  | 'Art Supplies'
  | 'Educational'
  | 'Technology';

export type TProduct = {
  name: string;
  brand: string;
  price: number;
  category: TProductCategory;
  description: string;
  quantity: number;
  inStock: boolean;
};
