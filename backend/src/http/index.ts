import { Request, Response, Router } from 'express'
import { PaypalController } from '@controllers/PaypalController';
import { Middleware } from 'src/middlewares';

const routes = Router()

routes
.get('/', (req: Request, res: Response) => {
  res.status(200).json('Ta vivo')
})
.post('/order', Middleware.authorize, PaypalController.createOrder)
.post('/token', PaypalController.createToken)

export { routes }