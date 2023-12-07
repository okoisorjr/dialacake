import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderList } from '../pages/models/order-list';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  where,
  getDocsFromServer,
  query,
  getDocs,
} from '@angular/fire/firestore';
import { Order } from '../pages/models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  ordersRef = collection(this.firestore, 'orders');

  constructor(
    private http: HttpClient,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  makeOrder(new_order: Order) {
    addDoc(this.ordersRef, {
      ...new_order,
      document_owner: this.auth.currentUser?.uid,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async retrieveAllOrders(): Promise<any> {
    let orders: any[] = [];

    // retrieve all orders
    const q = query(this.ordersRef);
    let retrieved_orders = await getDocsFromServer(q);
    retrieved_orders.forEach((document) => {
      orders.push(document.data());
    });

    return orders;
  }

  async retrieveAllClientsOrders() {
    let orders: any[] = [];
    if (this.auth.currentUser) {
      // retrieve all client's orders
      const q = query(
        this.ordersRef,
        where('document_owner', '==', this.auth.currentUser.uid)
      );
      let retrieved_orders = await getDocsFromServer(q);
      retrieved_orders.forEach((document) => {
        orders.push(document.data());
      });
    }
    return orders;
  }

  async filterOrders(deliveryStatus: string, user_id?: string) {
    let orders: any[] = [];
    let q;

    if (user_id) {
      q = query(
        this.ordersRef,
        where('deliveryStatus', '==', deliveryStatus),
        where('user_id', '==', this.auth.currentUser?.uid)
      );
    } else {
      q = query(this.ordersRef, where('deliveryStatus', '==', deliveryStatus));
    }
    let retrieved_orders = await getDocs(q);
    retrieved_orders.forEach((doc) => {
      orders.push({ doc_id: doc.id, ...doc.data() });
    });

    return orders;
  }
}
