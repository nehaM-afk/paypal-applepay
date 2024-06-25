// import { Injectable } from '@angular/core';
// import { loadScript } from '@paypal/paypal-js';

// @Injectable({
//   providedIn: 'root',
// })
// export class PaypalService {
//   async loadPayPal() {
//     const paypal = await loadScript({ clientId: 'AaF3x4iq4bsKKonOBX9fVMarJwTojQJYfN5D4jMXdxw3odvvLOkj-EWqTmzus7miBn35D9XrhhbfRKGA' });
//     return paypal;
//   }
// }


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  private loaded = false;

  loadPayPal(): Promise<any> {
    if (this.loaded) {
      return Promise.resolve((window as any).paypal);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AaF3x4iq4bsKKonOBX9fVMarJwTojQJYfN5D4jMXdxw3odvvLOkj-EWqTmzus7miBn35D9XrhhbfRKGA&components=buttons,funding-eligibility&enable-funding=applepay';
      script.onload = () => {
        this.loaded = true;
        resolve((window as any).paypal);
      };
      script.onerror = () => reject(new Error('PayPal SDK could not be loaded.'));
      document.head.appendChild(script);
    });
  }
}
