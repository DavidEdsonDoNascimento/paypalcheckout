import { Request, Response, Router } from 'express'
import { PaypalController } from '@controllers/PaypalController';

const routes = Router()

routes
.get('/', (req: Request, res: Response) => {
  res.status(200).json('Ta vivo')
})
.post('/orders', PaypalController.createOrder)
.post('/token', PaypalController.createToken)

export { routes }