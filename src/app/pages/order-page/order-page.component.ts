import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CakeService } from 'src/app/services/cake.service';
import { UserService } from 'src/app/services/user.service';
import { Cakes } from '../models/cakes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../models/order';
import {
  Flutterwave,
  InlinePaymentOptions,
  PaymentSuccessResponse,
} from 'flutterwave-angular-v3';
import { environment } from 'src/environments/environment';
import { OrderService } from 'src/app/services/order.service';
import { DeliveryStatus } from 'src/app/shared/delivery-status';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
  @Input() selectedCake!: any;
  @Output() sendPaymentStatus = new EventEmitter();
  @Output() dismissModal = new EventEmitter();

  new_order: Order = new Order();
  layers: string[] = ['SINGLE', 'DOUBLE'];
  flavours: any[] = [
    { flavour: 'Vanilla', price: 0 },
    { flavour: 'Chocolate', price: 1500 },
    { flavour: 'Red-Velvet', price: 2000 },
    { flavour: 'Vanilla & Chocolate', price: 3000 },
    { flavour: 'Vanilla & Red-Velvet', price: 3000 },
    { flavour: 'Chocolate & Red-Velvet', price: 3500 },
  ];
  layer: number = 1;

  // FLUTTERWAVE PAYMENT
  customerDetails = {
    name: this.auth.currentUser?.displayName,
    email: this.auth.currentUser?.email,
  };

  customizations: any;

  meta = {
    counsumer_id: this.auth.currentUser?.uid,
    cake_ordered: this.selectedCake?.cakeName,
  };

  constructor(
    private userService: UserService,
    private cakeService: CakeService,
    private modalService: NgbModal,
    private orderService: OrderService,
    private flutterwave: Flutterwave,
    private firestore: Firestore,
    private router: Router,
    private auth: Auth
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
      this.new_order.user_id = this.auth.currentUser?.uid;
      this.new_order.user = this.auth.currentUser?.displayName;
      this.new_order.user_email = this.auth.currentUser?.email;
      this.new_order.cakeName = this.selectedCake.cakeName;
      this.new_order.cakeCategory = this.selectedCake.category;
      this.new_order.cakeImageURL = this.selectedCake.imageURL;

      let result = await this.orderService.makeOrder(this.new_order);
      this.ngOnInit();
      this.modalService.dismissAll();

      /* this.orderService.createNewOrder(this.new_order).subscribe((value) => {
        if (value) {
          console.log(value);
          this.modalService.dismissAll();
        }
      }); */
    }
    this.flutterwave.closePaymentModal(5);
  }
  makePayment(loginModal: any) {
    if (this.auth.currentUser == null || this.auth.currentUser == undefined) {
      this.modalService.dismissAll();
      this.modalService.open(loginModal, { centered: true, size: 'sm' });
    } else {
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
      this.orderService.retrieveAllOrders();
      this.flutterwave.inlinePay(paymentData);
    }
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
    //console.log(this.selectedCake);
    this.new_order.grandPrice = this.selectedCake.price;
    this.new_order.layers = 'SINGLE';
    let user_detail = (
      await getDoc(doc(this.firestore, `users/${this.auth.currentUser?.uid}`))
    ).data();
    if (user_detail) {
      this.new_order.user_phone = user_detail['phone'];
    }
    console.log(this.customerDetails);
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
      this.new_order.grandPrice = this.new_order.grandPrice * this.layer;
      //console.log(this.new_order.grandPrice);
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
    if (this.new_order.birthdayCard) {
      this.new_order.grandPrice + 1000;
    } else {
      this.new_order.grandPrice - 1000;
    }
  }

  pickFlavour(flavour: string) {
    this.new_order.flavour = flavour;
  }

  closeModal() {
    this.dismissModal.emit();
  }
}
