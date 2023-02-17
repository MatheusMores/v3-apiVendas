import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import Product from "@modules/products/typeorm/entities/Product";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: Product[];
}


class CreateOrderService {
    public async execute({customer_id, products}: IRequest): Promise<void>{
        const ordersRepository = getCustomRepository(OrdersRepository);
        const customerRepository = getCustomRepository(CustomersRepository);
        const productsRepository = getCustomRepository(ProductRepository);

        const customerExists = await customerRepository.findById(customer_id);
        if(!customerExists){
            throw new AppError("Could not find any customer with the giver id")
        }

        const existsProducts = await productsRepository.findAllByIds(products);
        

    }
}

export default CreateOrderService;