import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (productData: Product): Promise<Product> => {
  const result = await ProductModel.create(productData);
  return result;
};

const getAllProductsFromDB = async (searchValue: string | object) => {
  const filter =
    typeof searchValue === 'string' ? { name: searchValue } : searchValue;
  const result = await ProductModel.find(filter);
  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.findById(productId);
  return result;
};

const updateProductFromDB = async (
  productId: string,
  data: Partial<Product>,
) => {
  const result = await ProductModel.findByIdAndUpdate(productId, data, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (productId: string) => {
  const result = await ProductModel.findByIdAndDelete(productId);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
