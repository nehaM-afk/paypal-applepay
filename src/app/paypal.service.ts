import { Injectable } from '@angular/core';
import { loadScript } from '@paypal/paypal-js';

@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  async loadPayPal() {
    const paypal = await loadScript({ clientId: 'AaF3x4iq4bsKKonOBX9fVMarJwTojQJYfN5D4jMXdxw3odvvLOkj-EWqTmzus7miBn35D9XrhhbfRKGA' });
    return paypal;
  }
}
