import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Address, User } from '../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  orders!: number;
  fullname!: string | null;
  email!: string | null;
  id!: string;
  currentUser: any;
  editAddress: Address = new Address();

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private auth: Auth,
    private router: Router
  ) {}

  async ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user === null) {
        this.router.navigate(['/cakes']);
      } else {
        this.userService
          .fetchUserAccountDetails()
          .then((res) => {
            this.currentUser = res;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });

    this.orders = await this.orderService.getTotalOrdersCount();
  }

  async updateProfile(userProfileForm: any) {
    this.userService
      .updateUserPhone(this.currentUser.phone)
      .then((res) => {
        Swal.fire({
          title: 'Congratulations!',
          text: 'Your  information has been updated successfully.',
          icon: 'success',
          timer: 2000,
        });
        this.ngOnInit();
      })
      .catch((error) => {
        Swal.fire({
          title: 'Failed!',
          text: `${error}`,
          icon: 'error',
          timer: 3000,
        });
      });
  }

  async submitAddress(addressForm: any) {
    this.userService
      .saveAddress(this.currentUser.id, this.currentUser)
      .then((res) => {
        Swal.fire({
          title: 'Congratulations!',
          text: 'Your address information has been updated successfully.',
          icon: 'success',
          timer: 2000,
        });
        this.ngOnInit();
      })
      .catch((error) => {
        Swal.fire({
          title: 'Failed!',
          text: `${error.error.message}`,
          icon: 'error',
          timer: 2000,
        });
      });
  }
}
