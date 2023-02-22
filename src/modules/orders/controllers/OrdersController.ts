import { Request, Response } from "express";
import CreateOrderService from "../services/CreateOrderService";
import ShowOrderService from "../services/ShowOrderService";

class OrdersController {
    public async show(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;

        const showOrder = new ShowOrderService();
        const order = showOrder.execute({id});

        return res.json(order);
    }

    public async create(req: Request, res: Response): Promise<Response>{
        const { customer_id, products } = req.body;

        const createOrder = new CreateOrderService();
        const orders = await createOrder.execute({customer_id, products});

        return res.json(orders);
    }
}

export default OrdersController;