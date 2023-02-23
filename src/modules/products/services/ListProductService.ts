import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import RedisCache from "@shared/cache/RedisCache";

class ListProductService {
    public async execute(): Promise<Array<Product>>{
        const productsRepository = getCustomRepository(ProductRepository);

        const products = await productsRepository.find();

        return products;
    }

        /* Se o cache estivesse funcionando:
        const productsRepository = getCustomRepository(ProductRepository);

        const redisCache = new RedisCache();

        let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST')

        if(!products){
            let products = await productsRepository.find();

            await redisCache.save('api-vendas-PRODUCT_LIST', products)
        }

        return products;
        */
}

export default ListProductService;