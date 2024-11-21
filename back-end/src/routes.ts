import {Router} from "express";

const router = Router();

router.get('/',);

//User
router.get('/api/users', UserController.getAllUser);
router.get('/api/users/:id', UserController.getUser);
router.post('/api/auth/register', UserController.createUser);
router.put('/api/users/:id', UserController.updateUser);
router.delete('/api/user/:id', UserController.deleteUser);

//Product
router.get('/api/products', ProductController.getAllProducts)
router.get('/api/products/:id', ProductController.getProduct)
router.post('/api/products', ProductController.createProduct)
router.put('/api/products/:id', ProductController.updateProduct)
router.delete('/api/products/:id', ProductController.deleteProduct)

//Orders
router.get('/api/orders', OrderController.getAllOrders);
router.get('/api/orders/:id', OrderController.getOrder);
router.post('/api/orders', OrderController.createOrder)
router.put('/api/orders/:id', OrderController.updateOrder)
router.delete('/api/orders/:id', OrderController.deleteOrder)