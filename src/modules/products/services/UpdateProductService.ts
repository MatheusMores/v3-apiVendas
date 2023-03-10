import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({ id, name, price, quantity}: IRequest) {
        const productsRepository = getCustomRepository(ProductRepository);
    
        const product = await productsRepository.findOne(id);
        if (!product) {
            throw new AppError("Product not found")
        }

        const productExists = await productsRepository.findByName(name);
        if (productExists && name !== product.name){
            throw new AppError('There is already a product with this name')
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productsRepository.save(product);

        return product;
    }

    /* Se o cache estivesse funcinando:
        const productsRepository = getCustomRepository(ProductRepository);
    
        const redisCache = new RedisCache();

        const product = await productsRepository.findOne(id);
        if (!product) {
            throw new AppError("Product not found")
        }

        const productExists = await productsRepository.findByName(name);
        if (productExists && name !== product.name){
            throw new AppError('There is already a product with this name')
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await redisCache.invalidate('api-vendas-PRODUCT_LIST')

        await productsRepository.save(product);

        return product;
        */

}

export { UpdateProductService }