import {Router} from "express";

const router = Router();

router.get('/',);

//User
router.get('/api/users')
router.get('/api/users/:id')
router.post('/api/auth/register')
router.put('/api/users/:id')
router.delete('/api/user/:id')

//Product
router.get('/')
router.get('/')
router.post('/')
router.put('/')
router.delete('/')

//Orders
router.get('/')
router.get('/')
router.post('/')
router.put('/')
router.delete('/')