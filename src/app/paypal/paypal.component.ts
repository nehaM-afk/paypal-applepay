import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaypalService } from '../paypal.service';

@Component({
  selector: 'app-paypal',
  template: '<div id="paypal-button-container"></div>',
  styles: ['#paypal-button-container { margin-top: 20px; }'],
  standalone: true,
  imports: [CommonModule]
})
export class PaypalComponent implements OnInit {
  constructor(private paypalService: PaypalService) {}

  ngOnInit() {
    this.paypalService.loadPayPal().then((paypal) => {
      if (paypal && paypal.Buttons && paypal.FUNDING) {
        // const fundingSource = paypal.FUNDING['APPLEPAY'];

        paypal.Buttons({
          // fundingSource,
          createOrder: (data, actions) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [{
                amount: {
                  currency_code: 'USD',
                  value: '0.01'
                }
              }]
            });
          },
          onApprove: (data, actions) => {
            if (!actions.order) {
              console.error('actions.order is undefined');
              return Promise.reject('actions.order is undefined');
            }
            return actions.order.capture().then((details) => {
              if (!details.payer || !details.payer.name) {
                console.error('details.payer or details.payer.name is undefined');
                return;
              }
              alert('Transaction completed by ' + details.payer.name.given_name);
            }).catch(error => {
              console.error('Error capturing order:', error);
            });
          }
        }).render('#paypal-button-container');
      } else {
        console.error('PayPal Buttons or FUNDING not loaded');
      }
    }).catch((error) => {
      console.error('PayPal SDK could not be loaded:', error);
    });
  }
}
