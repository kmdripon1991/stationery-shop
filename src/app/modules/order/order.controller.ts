import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItem = req.body;
    const result = await OrderServices.placeOrder(orderItem);
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      message: err?.message || 'Internal server error',
      status: false,
      error: err,
      stack: err.stack,
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.revenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue: result,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      message: err?.message || 'Internal server error',
      status: false,
      error: err,
      stack: err.stack,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getRevenue,
};
