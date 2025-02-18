export type PaypalOrderRequest = {
  intent: string;
  payment_source: any;
  purchase_units: PaypalPurchaseUnitRequest[];
}

export type PaypalOrderInput = {
  intent: string;
  payment_source: any;
  purchase_units: any[];
}

type PaypalPurchaseUnitRequest = {
  amount: PaypalAmountRequest;
  shipping: PaypalShippingRequest;
}

type PaypalAmountRequest = {
  currency_code: string;
  value: string;
}

type PaypalShippingRequest = {
  address: PaypalAddressRequest;
  company_name?: string;
  type?: string;
}

type PaypalAddressRequest = {
  address_line_1: string;
  address_line_2: string;
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
}

export type PaypalTokenResponse = {
  scope?: any,
  access_token: string;
  token_type?: string;
  expires_in?: number;
};

export type PaypalOrder = {
  id: string;
  status: string;
  intent: string;
  purchase_units: any[];
  links: any[];
}