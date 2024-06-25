// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-apple-pay',
//   standalone: true,
//   imports: [],
//   templateUrl: './apple-pay.component.html',
//   styleUrl: './apple-pay.component.scss'
// })
// export class ApplePayComponent {

// }


import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-apple-pay',
  templateUrl: './apple-pay.component.html',
  styleUrls: ['./apple-pay.component.scss'],
  standalone: true
})
export class ApplePayComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.renderPayPalButton();
  }

  renderPayPalButton(): void {
    (window as any).paypal.Buttons({
      fundingSource: (window as any).paypal.FUNDING.APPLEPAY,
      style: {
        shape: 'rect',
        color: 'black',
        layout: 'vertical',
        label: 'paypal'
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '1.00'
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      },
      onError: (err: any) => {
        console.error(err);
      }
    }).render('#paypal-button-container');
  }
}
