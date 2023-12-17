import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Login } from 'src/app/pages/models/login';
import { Register } from 'src/app/pages/models/register';
import { MenuItem } from '../admin-layout/admin-layout.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import {
  Auth
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  @Input() signin!: boolean;

  menu: MenuItem[] = [];
  showSideMenu: boolean = false;
  myOrders: any[] = [];
  currentUser: any;
  admins: any[] = [
    'Ak2Dzd3OQENa2UaOZZk4tZEkUXC2',
    'lIzjPKkP63a3BNUAv2oQcwDmmuv2',
    'WX6l3krc81U44ZN0L8yfcTjIXXU2',
  ];
  showSuccessfulRegistrationMessage: boolean = false;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    public auth: Auth,
    private orderService: OrderService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userService.fetchUserAccountDetails().then((user) => {
          this.currentUser = user;
        });
      } else {
        this.currentUser = null;
      }
    });

    // Fetch clients
    this.orderService.retrieveAllClientsOrders().then((orders) => {
      this.myOrders = orders;
    }).catch((error) => {
      console.log(error);
    });
    this.menu = [
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
      /* { title: 'My Orders', route: 'my-orders', icon: 'ri-shopping-cart-fill' }, */
    ];
  }

  gotoProfile() {
    this.router.navigate(['/profile'])
  }

  openLoginModal(loginModal: any) {
    this.modalService.open(loginModal, { centered: true, size: 'sm' });
  }

  openRegistrationModal(registrationModal: any) {
    this.modalService.open(registrationModal, { centered: true, size: 'sm' });
  }

  openLocationsModal(locationsModal: any) {
    this.modalService.open(locationsModal, { centered: true, size: 'md' });
  }

  async logout() {
    let result = await this.auth.signOut();
    this.userService.user = null;
    this.ngOnInit();
    this.router.navigate(['/cakes']);
  }

  refreshTopBar(event?: any) {
    if(event){
      this.showSuccessfulRegistrationMessage = true;
    }
    this.ngOnInit();
  }

  dismissAuthModal() {
    this.modalService.dismissAll();
  }

  saveLoggedInUser($event: any) {
    this.currentUser = $event;
    this.ngOnInit();
  }
}
