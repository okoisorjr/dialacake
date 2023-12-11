import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { OrderService } from 'src/app/services/order.service';
import { DeliveryStatus } from 'src/app/shared/delivery-status';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.css'],
})
export class ClientOrdersComponent implements OnInit {
  filterOptions: string[] = [];
  orders: any[] = [];
  totalOrdersPending: number = 0;

  constructor(private orderService: OrderService, private auth: Auth) {}

  async ngOnInit() {
    this.filterOptions.push('ALL_ORDERS');
    let m = Object.keys(DeliveryStatus);
    m.forEach((status) => {
      this.filterOptions.push(status);
    });

    this.orders = await this.orderService.retrieveAllClientsOrders();
    this.orders.forEach((order) => {
      if (order.deliveryStatus === 'PENDING') {
        this.totalOrdersPending++;
      }
    });
  }

  async setFilterOption(filterOption: string) {
    if(filterOption == 'ALL_ORDERS'){
      return this.ngOnInit();
    }
    this.orders = await this.orderService.filterOrders(
      filterOption,
      this.auth.currentUser?.uid
    );
  }
}
