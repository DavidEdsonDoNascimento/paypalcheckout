import { PayPalService } from '@services/Paypal';
import { Request, Response } from 'express';
import { Middleware } from 'src/middlewares';

export class PaypalController {

	static async createOrder(req: Request, res: Response) {
		try {
			const { intent, payment_source, purchase_units } = req.body;
      const { authorization } = req.headers;
      console.log('authorization aqui:');
      console.log(authorization);

      const [, token] = authorization.split(' ');

			const result = PayPalService.createOrder(token, {
				intent,
				payment_source,
				purchase_units,
			});

			res.status(201).json({ result });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	static async createToken(req: Request, res: Response) {
		try {
			const { access_token } = await PayPalService.generateToken();

			res.status(201).json({
				access_token: access_token || '',
			});
		} catch (err) {
			res.status(404).json({
				error: err,
			});
		}
	}
}
