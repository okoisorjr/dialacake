import { Component, OnInit } from '@angular/core';
import { Cakes } from '../models/cakes';
import { ActivatedRoute, Router } from '@angular/router';
import { CakeService } from 'src/app/services/cake.service';
import { Order } from '../models/order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cake-category',
  templateUrl: './cake-category.component.html',
  styleUrls: ['./cake-category.component.css'],
})
export class CakeCategoryComponent implements OnInit {
  category: any;
  cakes: any[] = [];
  selectedCake!: Cakes;
  new_order: Order = new Order();
  layers: string[] = ['SINGLE', 'DOUBLE'];
  flavours: string[] = ['Vanilla', 'Strawberry', 'Chocolate'];

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private cakeService: CakeService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  async ngOnInit() {
    this.category = this.ar.snapshot.paramMap.get('category');
    //this.category = this.category.toUpperCase().replaceAll('-', ' ');
    if (this.category == 'celebration-cakes') {
      this.cakes = await this.cakeService.retrieveCelebrationCakes();
    } else if (this.category == 'discounted-cakes') {
      this.cakes = await this.cakeService.retrieveDiscountedCakes();
    } else if (this.category == 'kiddies-cakes') {
      this.cakes = await this.cakeService.retrieveKiddiesCakes();
    } else if (this.category == 'plant-based-cakes') {
      this.cakes = await this.cakeService.retrievePlantBasedCakes();
    }
    /* this.cakeService.fetchCategoryCakes(this.category).subscribe((value) => {
      this.cakes = value;
    }); */
  }

  openOrderModal(cake: Cakes, orderModal: any) {
    this.selectedCake = cake;
    if (this.selectedCake)
      this.modalService.open(orderModal, { centered: true, size: 'lg' });
  }

  primarycounter = 1;
  primarydecrement() {
    this.primarycounter--;
    this.new_order.cakeCount = this.primarycounter;
  }

  primaryincrement() {
    this.primarycounter++;
    this.new_order.cakeCount = this.primarycounter;
  }

  checkOut(orderForm: any) {}
}
