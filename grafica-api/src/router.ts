import { Router } from 'express';
import { createClient } from './app/useCases/client/createClient';
import { deleteClient } from './app/useCases/client/deleteClient';
import { findAllClient } from './app/useCases/client/findAllClient';
import { findByClient } from './app/useCases/client/findByClient';
import { updateClient } from './app/useCases/client/updateClient';
import { createOrder } from './app/useCases/order/createOrder';
import { deleteOrder } from './app/useCases/order/deleteOrder';
import { findAllOrder } from './app/useCases/order/findAllOrder';
import { findByOrder } from './app/useCases/order/findByOrder';
import { updateOrder } from './app/useCases/order/updateOrder';
import { createProduct } from './app/useCases/product/createProduct';
import { deleteProduct } from './app/useCases/product/deleteProduct';
import { findAllProduct } from './app/useCases/product/findAllProduct';
import { findByProduct } from './app/useCases/product/findByProduct';
import { updateProduct } from './app/useCases/product/updateProduct';
const router = Router();

// Router Client
router.get('/clients', findAllClient);
router.get('/clients/:id', findByClient);
router.post('/clients', createClient);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

// Router Product
router.get('/products', findAllProduct);
router.get('/products/:id', findByProduct);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Router Order
router.get('/orders', findAllOrder);
router.get('/orders/:id', findByOrder);
router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);


export { router };