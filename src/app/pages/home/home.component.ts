import { Component, OnInit } from '@angular/core';
import { Cakes } from '../models/cakes';
import { Order } from '../models/order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { OrderService } from 'src/app/services/order.service';
import { CakeService } from 'src/app/services/cake.service';
import { DeliveryStatus } from 'src/app/shared/delivery-status';
import { Router } from '@angular/router';
import { Flutterwave, InlinePaymentOptions, PaymentSuccessResponse } from 'flutterwave-angular-v3';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cakes: any[] = [];
  discountedCakes: Cakes[] = [];
  kiddiesCakes: Cakes[] = [];
  celebrationCakes: Cakes[] = [];
  plantBasedCakes: Cakes[] = [];
  selectedCake!: Cakes;
  new_order: Order = new Order();
  layers: string[] = ['SINGLE', 'DOUBLE'];
  flavours: string[] = ['Vanilla', 'Strawberry', 'Chocolate'];
  layer: number = 0;

  // FLUTTERWAVE PAYMENT
  customerDetails = {
    name: 'yvette baker',
    email: 'customer@mail.com',
    phone_number: '08100000000',
  };

  customizations: any;

  meta = { counsumer_id: '7898', consumer_mac: 'kjs9s8ss7dd' };

  constructor(
    private userService: UserService,
    private cakeService: CakeService,
    private modalService: NgbModal,
    private orderService: OrderService,
    private router: Router,
    private flutterwave: Flutterwave
  ) {}

  /** ****************************************PAYMENT GATEWAY********************************************************* */
  async makePaymentCallback(response: PaymentSuccessResponse) {
    console.log('Pay', response);
    if (response) {
      this.new_order.flw_ref = response.flw_ref ? response.flw_ref : null;
      this.new_order.tx_ref = response.tx_ref ? response.tx_ref : null;
      this.new_order.paymentStatus = response.status ? response.status : null;
      this.new_order.chargedAmount = response.amount ? response.amount : null;
      this.new_order.deliveryStatus = DeliveryStatus.PENDING;
      this.new_order.transactionId = response.transaction_id
        ? response.transaction_id
        : null;
      console.log(this.new_order);
      let result = await this.orderService.makeOrder(this.new_order);
    }
    this.flutterwave.closePaymentModal(5);
  }

  makePayment() {
    let paymentData: InlinePaymentOptions = {
      public_key: environment.FLUTTER_PUBLIC_API_KEY,
      tx_ref: this.generateReference(),
      amount: this.new_order.grandPrice,
      currency: 'NGN',
      payment_options: 'card,ussd',
      redirect_url: '',
      meta: this.meta,
      customer: this.customerDetails,
      customizations: this.customizations,
      callback: this.makePaymentCallback,
      onclose: this.closedPaymentModal,
      callbackContext: this,
    };
    this.flutterwave.inlinePay(paymentData);
  }

  closedPaymentModal(): void {
    console.log('payment is closed');
  }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
  /*******************************************END PAYMENT************************************************************* */

  async ngOnInit() {
    this.cakes = await this.cakeService.retrieveCakes();
    console.log(this.cakes);
    this.cakes.map((cake: Cakes) => {
      if (cake.category == 'CELEBRATION CAKES') {
        this.celebrationCakes.push(cake);
      } else if (cake.category == 'DISCOUNTED CAKES') {
        this.discountedCakes.push(cake);
      } else if (cake.category == 'KIDDIES CAKES') {
        this.kiddiesCakes.push(cake);
      } else {
        this.plantBasedCakes.push(cake);
      }
    });
    /* this.cakeService.fetchAllCakes().subscribe((value) => {
      value.map((cake) => {
        if (cake.category == 'DISCOUNTED CAKES') {
          this.discountedCakes.push(cake);
        } else if (cake.category == 'CELEBRATION CAKES') {
          this.celebrationCakes.push(cake);
        }
      });
    }); */
  }

  selectCake(cake: Cakes) {
    console.log(cake);
    this.new_order.cake = cake.owner_id;
    this.selectedCake = cake;
  }

  openOrderModal(cake: Cakes, orderModal: any) {
    this.selectedCake = cake;
    this.customizations = {
      title: 'dialacake.ng',
      description: `Payment for ${
        this.selectedCake && this.selectedCake.cakeName
      }`,
      logo: 'https://flutterwave.com/images/logo-colored.svg',
    };
    this.new_order.user = '6561b0d701b09e896334a1e3';
    this.new_order.grandPrice = this.selectedCake.price;
    this.new_order.birthdayCard = false;
    this.new_order.wine = false;
    this.new_order.cakeCount = 1;
    this.modalService.open(orderModal, { centered: true, size: 'lg' });
  }

  primarydecrement() {
    if (this.new_order.cakeCount == 1) {
      return;
    }
    if (this.new_order.cakeCount >= 1) {
      this.new_order.grandPrice -= this.layer * this.selectedCake.price;
      this.new_order.cakeCount -= 1;
    }
  }

  primaryincrement() {
    this.new_order.cakeCount += 1;
    if (this.new_order.cakeCount >= 1) {
      this.new_order.grandPrice =
        this.selectedCake.price * this.new_order.cakeCount;
      /* this.new_order.grandPrice + this.layer
          ? this.layer * this.selectedCake.minPrice
          : this.selectedCake.minPrice + this.selectedCake.minPrice; */
    }
  }

  updatePrice(layer: string) {
    if (layer == 'DOUBLE') {
      this.new_order.layers = layer;
      this.layer = 2;
      this.new_order.grandPrice =
        this.selectedCake.price * this.layer * this.new_order.cakeCount;
      console.log(this.new_order.grandPrice);
    } else if (layer == 'SINGLE' && this.new_order.layers == 'DOUBLE') {
      this.new_order.layers = layer;
      this.layer = 1;
      this.new_order.grandPrice =
        (this.new_order.grandPrice / 2) * this.new_order.cakeCount;
    } else if (layer == 'SINGLE' && !this.new_order.layers) {
      this.layer = 1;
      this.new_order.layers = layer;
      this.new_order.grandPrice =
        this.selectedCake.price * 1 * this.new_order.cakeCount;
    }
  }

  addBirthdayCard() {
    this.new_order.birthdayCard = !this.new_order.birthdayCard;
    console.log(this.new_order.birthdayCard);
  }

  routeToCategory(category: string) {
    console.log(category);
    this.router.navigate(['/cakes/', category]);
  }

}
