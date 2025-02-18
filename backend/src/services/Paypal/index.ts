import {
	PaypalOrder,
	PaypalOrderInput,
	PaypalOrderRequest,
	PaypalTokenResponse,
} from '@interfaces/Paypal';
import { Middleware } from 'src/middlewares';

const { PAYPAL_API_BASE_URL, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } =
	process.env;

export class PayPalService {

	static async generateToken(): Promise<PaypalTokenResponse> {
		if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
			console.log(
				'erro nao foi encontrado PAYPAL_CLIENT_ID ou PAYPAL_CLIENT_SECRET'
			);
			throw new Error('Missing API credentials');
		}
		console.log('PAYPAL_CLIENT_ID: ' + JSON.stringify(PAYPAL_CLIENT_ID));
		console.log(
			'PAYPAL_CLIENT_SECRET: ' + JSON.stringify(PAYPAL_CLIENT_SECRET)
		);

		const url = `${PAYPAL_API_BASE_URL}/v1/oauth2/token`;
		const auth = Buffer.from(
			`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
		).toString('base64');
		const headers = new Headers();
		headers.append('Authorization', `Basic ${auth}`);
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		const searchParams = new URLSearchParams();
		searchParams.append('grant_type', 'client_credentials');

		const options = {
			method: 'POST',
			headers,
			body: searchParams,
		};

		const response = await fetch(url, options);
		const data: PaypalTokenResponse =
			(await response.json()) as PaypalTokenResponse;
		return { access_token: data.access_token };
	}

	static async createOrder(
		access_token: string,
		input_order: PaypalOrderInput,
		attempt = 1
	): Promise<PaypalOrder> {

		console.log('Chamada | Criar pedido | qt tentativas:', attempt);
		
		if (attempt > 3) {
			console.log('*Falha | Chamada | Criar pedido | qt tentativas:', attempt);
      throw new Error('Failed to create order after multiple attempts');
    }

		try {
			const url = `${PAYPAL_API_BASE_URL}/v2/checkout/orders`;
			const headers = new Headers();
			headers.append('PayPal-Request-Id', Date.now().toString());
			headers.append('Authorization', `Bearer ${access_token}`);
			headers.append('Content-Type', 'application/json');

			const { intent, payment_source, purchase_units } = input_order;

			const payload: PaypalOrderRequest = {
				intent: intent || 'CAPTURE',
				payment_source,
				purchase_units,
			};

			console.log('Chamada | Criar pedido | Payload:', payload);

			const response = await fetch(url, {
				method: 'POST',
				headers,
				body: JSON.stringify(payload),
			});

			// token não autorizado / expirado
			if (response.status === 401) {
				const { access_token } = await PayPalService.generateToken();
				return await PayPalService.createOrder(access_token, input_order, attempt + 1);
			}

			const result = (await response.json()) as PaypalOrder;

			console.log('Chamada | Criar pedido | Resultado:', result);
			
			return result;
		} catch (error) {
			console.error('Error creating order', error);
			throw new Error('Error creating order');
		}
	}
}
