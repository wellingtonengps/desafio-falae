import {Router} from "express";
import UsersController from "../controllers/UsersController";
import ProductsController from "../controllers/ProductsController";
import OrdersController from "../controllers/OrdersController";

const Routers = Router();

//User
Routers.get('/api/users', UsersController.getAllUser);
Routers.get('/api/users/:id', UsersController.getUser);
Routers.post('/api/auth/register', UsersController.createUser);
Routers.put('/api/users/:id', UsersController.updateUser);
Routers.delete('/api/user/:id', UsersController.deleteUser);

//Product
Routers.get('/api/products', ProductsController.getAllProducts)
Routers.get('/api/products/:id', ProductsController.getProduct)
Routers.post('/api/products', ProductsController.createProduct)
Routers.put('/api/products/:id', ProductsController.updateProduct)
Routers.delete('/api/products/:id', ProductsController.deleteProduct)

//Orders
Routers.get('/api/orders', OrdersController.getAllOrders);
Routers.get('/api/orders/:id', OrdersController.getOrder);
Routers.post('/api/orders', OrdersController.createOrder)
Routers.put('/api/orders/:id', OrdersController.updateOrder)
Routers.delete('/api/orders/:id', OrdersController.deleteOrder)

export default Routers;