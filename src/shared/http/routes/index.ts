import productsRouter from '@modules/products/routes/poroducts.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);

routes.get('/', (req, res) => {
    return res.json({ok: true});
})

export default routes;