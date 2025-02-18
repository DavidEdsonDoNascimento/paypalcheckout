import { PayPalService } from '@services/Paypal';
import { Request, Response } from 'express';

const {
	PAYPAL_API_BASE_URL,
} = process.env;



export class PaypalController {
  static async createOrder(req: Request, res: Response) {
    try {
      const { paymentToken, shippingAddress } = req.body;
      const { access_token } = await PayPalService.generateToken();
      const result = PayPalService.createOrder(access_token, {
        shippingAddress,
        paymentToken,
      })
  
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
