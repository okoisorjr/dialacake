import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/pages/models/login';
import { Register } from 'src/app/pages/models/register';
import { MenuItem } from '../admin-layout/admin-layout.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from '@angular/fire/auth';
import {
  doc,
  Firestore,
  setDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  submitted: boolean = false;
  loginUser: Login = new Login();
  newUser: Register = new Register();
  user$: any;
  menu: MenuItem[] = [];
  showSideMenu: boolean = false;
  myOrders: any[] = [];
  currentUser: any;
  admins: any[] = [
    'Ak2Dzd3OQENa2UaOZZk4tZEkUXC2',
    'lIzjPKkP63a3BNUAv2oQcwDmmuv2',
    'WX6l3krc81U44ZN0L8yfcTjIXXU2',
  ];

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private auth: Auth,
    private firestore: Firestore,
    private orderService: OrderService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.currentUser = this.auth.currentUser;
    this.myOrders = await this.orderService.retrieveAllClientsOrders();
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
    /* console.log(this.myOrders); */
  }

  toggleSideMenu() {
    this.showSideMenu = !this.showSideMenu;
    console.log(this.showSideMenu);
  }

  openLoginModal(loginModal: any) {
    this.modalService.open(loginModal, { centered: true, size: 'sm' });
  }

  openRegistrationModal(registrationModal: any) {
    this.modalService.open(registrationModal, { centered: true, size: 'sm' });
  }

  signUp(regForm: any) {
    createUserWithEmailAndPassword(
      this.auth,
      this.newUser.email,
      this.newUser.password
    )
      .then((result) => {
        const dbInstance = doc(this.firestore, 'users', result.user.uid);
        updateProfile(result.user, { displayName: this.newUser.fullname });
        sendEmailVerification(result.user);
        setDoc(dbInstance, {
          ...this.newUser,
          password: '',
          id: result.user.uid,
          createdAt: serverTimestamp(),
          lastModified: serverTimestamp(),
        }).then((res) => {
          this.modalService.dismissAll();
          this.newUser = new Register();
        });
      })
      .catch((error) => {
        this.modalService.dismissAll();
        console.log(error);
      });
  }

  async login(loginForm: any) {
    let currentUser = await this.userService.loginUser(this.loginUser);
    if (currentUser) {
      this.ngOnInit();
      this.loginUser = new Login();
      this.modalService.dismissAll();
    }

    /* this.userService.loginUser(this.loginUser).subscribe((value) => {
      console.log(value);
    }) */
  }

  async logout() {
    let result = await this.auth.signOut();
    this.ngOnInit();
    this.router.navigate(['/cakes']);
  }
}
