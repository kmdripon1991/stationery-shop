import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body.product;
    const result = await ProductServices.createProductIntoDB(payload);
    res.status(200).json({
      message: 'Product created Successfully',
      success: true,
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      message: 'Validation Failed',
      success: false,
      error: err.errors.category,
      stack: err.stack,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const filter = {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    };

    const result = await ProductServices.getAllProductsFromDB(
      searchTerm ? filter : {},
    );
    res.status(200).json({
      message: 'Product retrieve successfully',
      status: true,
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      message: 'Products not found',
      status: false,
      error: err.errors.category,
      stack: err.stack,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      message: 'Product retrieve successfully',
      status: true,
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      message: 'Product not found',
      status: false,
      error: err,
      stack: err.stack,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const updateData = req.body;
    const result = await ProductServices.updateProductFromDB(
      productId,
      updateData,
    );
    res.status(200).json({
      message: 'Product updated successfully',
      status: true,
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      message: 'Products not found',
      status: false,
      error: err.message,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  try {
    const result = await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      message: 'Product deleted successfully',
      status: true,
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      message: 'Something went wrong',
      status: false,
      error: err,
      stack: err.stack,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  singleProduct: getSingleProduct,
  updateProduct,
  deleteProduct,
};
