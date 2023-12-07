import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

export interface MenuItem {
  title: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit {
  menu: MenuItem[] = [];
  ordersPendingCount: number = 0;
  currentUser: any;
  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    public auth: Auth,
    private router: Router
  ) {}

  async ngOnInit() {
    this.currentUser = this.auth.onAuthStateChanged((user): any => {
      if (user) {
        return user;
      } else {
        return null;
      }
    });

    if (this.auth.currentUser == null) {
      this.router.navigate(['/cakes']);
    }
    this.menu = [
      { title: 'Add Cake', route: 'add-cake', icon: 'ri-add-box-fill' },
      {
        title: 'Celebration Cakes',
        route: 'celebration-cakes',
        icon: 'ri-cake-3-fill',
      },
      {
        title: 'Discounted Cakes',
        route: 'discounted-cakes',
        icon: 'ri-cake-line',
      },
      {
        title: 'Kiddies Cakes',
        route: 'kiddies-cakes',
        icon: 'ri-cake-2-line',
      },
      {
        title: 'Plant Based Cakes',
        route: 'plant-based-cakes',
        icon: 'ri-cake-2-fill',
      },
      {
        title: 'Orders',
        route: 'order-history',
        icon: 'ri-shopping-cart-fill',
      },
    ];
    this.orders = await this.orderService.retrieveAllOrders();
    this.orders.forEach((order) => {
      if (order.deliveryStatus === 'PENDING') {
        this.ordersPendingCount++;
      }
    });
  }

  async logout() {
    let result = await this.auth.signOut();
    this.router.navigate(['/cakes']);
  }
}
