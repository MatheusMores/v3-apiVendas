import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";

interface IRequest {
    id: string
}

class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id);
        if (!product){
            throw new AppError('Product not found')
        }

        productsRepository.remove(product);
    }

        /* Se o cache estivesse funcionando:
        const productsRepository = getCustomRepository(ProductRepository);

        const redisCache = new RedisCache();

        const product = await productsRepository.findOne(id);
        if (!product){
            throw new AppError('Product not found')
        }
        
        await redisCache.invalidate('api-vendas-PRODUCT_LIST')

        productsRepository.remove(product);
        */
}

export default DeleteProductService;