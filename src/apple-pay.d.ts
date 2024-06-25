interface ApplePayPaymentRequest {
    countryCode: string;
    currencyCode: string;
    supportedNetworks: string[];
    merchantCapabilities: string[];
    total: ApplePayLineItem;
    lineItems?: ApplePayLineItem[];
    billingContact?: ApplePayPaymentContact;
    shippingContact?: ApplePayPaymentContact;
    shippingMethods?: ApplePayShippingMethod[];
    shippingType?: ApplePayShippingType;
    requiredBillingContactFields?: ApplePayContactField[];
    requiredShippingContactFields?: ApplePayContactField[];
    applicationData?: string;
  }
  
  interface ApplePayLineItem {
    label: string;
    amount: string;
    type?: 'final' | 'pending';
  }
  
  interface ApplePayPaymentContact {
    phoneNumber?: string;
    emailAddress?: string;
    givenName?: string;
    familyName?: string;
    addressLines?: string[];
    locality?: string;
    administrativeArea?: string;
    postalCode?: string;
    country?: string;
    countryCode?: string;
  }
  
  interface ApplePayShippingMethod {
    identifier: string;
    label: string;
    detail: string;
    amount: string;
  }
  
  type ApplePayShippingType = 'shipping' | 'delivery' | 'storePickup' | 'servicePickup';
  
  type ApplePayContactField = 'postalAddress' | 'phone' | 'email' | 'name' | 'phoneticName';
  
  declare class ApplePaySession {
    constructor(version: number, paymentRequest: ApplePayPaymentRequest);
    static canMakePayments(): boolean;
    static canMakePaymentsWithActiveCard(merchantIdentifier: string): Promise<boolean>;
    static STATUS_SUCCESS: number;
    static STATUS_FAILURE: number;
    begin(): void;
    abort(): void;
    completeMerchantValidation(merchantSession: any): void;
    completePayment(status: number): void;
    onvalidatemerchant(event: any): void;
    onpaymentauthorized(event: any): void;
    oncancel(event: any): void;
  }
  