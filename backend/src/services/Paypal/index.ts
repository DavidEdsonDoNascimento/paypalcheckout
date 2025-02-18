import {
	PaypalOrder,
	PaypalOrderInput,
	PaypalOrderRequest,
	PaypalTokenResponse,
} from '@interfaces/Paypal';

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
		input_order: PaypalOrderInput
	): Promise<PaypalOrder> {
		const url = `${PAYPAL_API_BASE_URL}/v2/checkout/orders`;
		const headers = new Headers();
		headers.append('PayPal-Request-Id', Date.now().toString());
		headers.append('Authorization', `Bearer ${access_token}`);
		headers.append('Content-Type', 'application/json');

		const { shippingAddress, paymentToken } = input_order;

		const { fullName } = shippingAddress?.name ?? {};
		const { countryCode, nationalNumber } = shippingAddress?.phoneNumber ?? {};
		const payload: PaypalOrderRequest = {
			intent: 'CAPTURE',
			payment_source: {
				card: {
					single_use_token: paymentToken.id,
				},
			},
			purchase_units: [
				{
					amount: {
						currency_code: 'USD',
						value: '110.00',
					},
					...(shippingAddress && {
						shipping: {
							type: 'SHIPPING',
							...(fullName && {
								name: {
									full_name: fullName,
								},
							}),
							company_name: shippingAddress.companyName || null,
							address: {
								address_line_1: shippingAddress.address.addressLine1,
								address_line_2: shippingAddress.address.addressLine2,
								admin_area_2: shippingAddress.address.adminArea2,
								admin_area_1: shippingAddress.address.adminArea1,
								postal_code: shippingAddress.address.postalCode,
								country_code: shippingAddress.address.countryCode,
							},
							...(countryCode &&
								nationalNumber && {
									phone_number: {
										country_code: countryCode,
										national_number: nationalNumber,
									},
								}),
						},
					}),
				},
			],
		};

		const response = await fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify(payload),
		});
		const result = (await response.json()) as PaypalOrder;

		return result;
	}
}
