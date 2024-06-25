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
      if (paypal && paypal.Buttons) {
        paypal.Buttons({
          createOrder: (data : any, actions : any) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: '1.00'
                }
              }]
            });
          },
          onApprove: (data : any , actions : any) => {
            return actions.order.capture().then((details: any) => {
              alert('Transaction completed by ' + details.payer.name.given_name);
            });
          },
          onError: (err: any) => {
            console.error(err);
          }
        }).render('#paypal-button-container');
      } else {
        console.error('PayPal Buttons not loaded');
      }
    }).catch((error) => {
      console.error('PayPal SDK could not be loaded:', error);
    });
  }
}
