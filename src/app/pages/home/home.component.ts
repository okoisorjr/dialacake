import { Component, OnInit } from '@angular/core';
import { Cakes } from '../models/cakes';
import { Order } from '../models/order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { OrderService } from 'src/app/services/order.service';
import { CakeService } from 'src/app/services/cake.service';
import { DeliveryStatus } from 'src/app/shared/delivery-status';
import { Router } from '@angular/router';
import {
  Flutterwave,
  InlinePaymentOptions,
  PaymentSuccessResponse,
} from 'flutterwave-angular-v3';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cakes: any[] = [];
  discountedCakes: Cakes[] = [];
  kiddiesCakes: Cakes[] = [];
  celebrationCakes: Cakes[] = [];
  plantBasedCakes: Cakes[] = [];
  selectedCake!: Cakes;
  feedbacks: string[] = [
    "I just tasted your cake! Wooooowww!! And it's plant based??? Oh my goooooodddddnesssss!!!!! I'm not even a cake person but I have warned my daughter not to touch the remaining.",
    "Good morning sis, I really want to appreciate you for that lovely cake my folks were so impressed with the cake, in their words they've never tasted a cake this good, they have been eating local cake, thank you. Even, your prompt delivery too, God bless you and your family!",
    "Oh yes! I can't wait and I just loved meeting your daughters. Give them my love! And your cake was divine!",
  ];

  constructor(
    private userService: UserService,
    private cakeService: CakeService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  async ngOnInit() {
    this.celebrationCakes = await this.cakeService.retrieveCelebrationCakes(
      'home'
    );
    this.discountedCakes = await this.cakeService.retrieveDiscountedCakes('home');
    this.plantBasedCakes = await this.cakeService.retrievePlantBasedCakes('home');
    this.kiddiesCakes = await this.cakeService.retrieveKiddiesCakes('home');

    this.cakes = [
      ...this.kiddiesCakes,
      ...this.celebrationCakes,
      ...this.discountedCakes,
      ...this.plantBasedCakes,
    ];
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

  openOrderModal(cake: Cakes, orderModal: any) {
    //console.log(cake);
    this.selectedCake = cake;
    this.modalService.open(orderModal, { centered: true, size: 'lg' });
  }

  routeToCategory(category: string) {
    console.log(category);
    this.router.navigate(['/cakes/', category]);
  }
}
