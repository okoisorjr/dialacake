import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { DeliveryStatus } from 'src/app/shared/delivery-status';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  filterOptions: string[] = [];
  orders: any[] = [];
  pendingOrdersCount: number = 0;

  constructor(private orderService: OrderService) {}

  async ngOnInit() {
    let m = Object.keys(DeliveryStatus);
    m.forEach((status) => {
      this.filterOptions.push(status);
    });

    this.orders = await this.orderService.retrieveAllOrders();
    this.orders.forEach((order) => {
      if (order.deliveryStatus === 'PENDING') {
        this.pendingOrdersCount++;
      }
    });

    /* this.orderService.fetchAllOrders().subscribe((value) => {
      this.orders = value;
    }); */
  }

  async setFilterOption(filterOption: string) {
    this.orders = await this.orderService.filterOrders(filterOption);
  }
}
