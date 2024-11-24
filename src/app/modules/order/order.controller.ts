import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItem = req.body;
    const result = await OrderServices.placeOrder(orderItem);

    if (typeof result === 'string') {
      res.status(400).json({
        message: result,
        status: false,
        error: Error,
      });
      return;
    }

    res.status(201).json({
      message: 'Order completed successfully',
      status: true,
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'Internal server error',
      status: false,
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
        totalRevenue:
          Array.isArray(result) && result.length > 0 ? result[0].subTotal : 0,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      message: 'Internal server error',
      status: false,
      error: err,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getRevenue,
};
