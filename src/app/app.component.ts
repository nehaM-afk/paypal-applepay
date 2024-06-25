import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PaypalComponent } from './paypal/paypal.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { SubscriptionService } from './apple-pay/subscription.service';
// import { PayPalService } from './paypal.service';
// import { ApplePayComponent } from './apple-pay/apple-pay.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, PaypalComponent],
  providers: [
    
    ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-payment-gateway';
}
