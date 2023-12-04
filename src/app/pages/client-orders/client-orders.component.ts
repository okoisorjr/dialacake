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

  setFilterOption(filterOption: string) {
    this.orderService;
  }
}
