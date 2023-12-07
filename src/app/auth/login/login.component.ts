import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Login } from 'src/app/pages/models/login';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() loggedInUser = new EventEmitter();
  @Output() closeModal = new EventEmitter();

  currentUser: any;
  submitted: boolean = false;
  loginUser: Login = new Login();

  constructor(
    private userService: UserService,
    private auth: Auth,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  async login(loginForm: any) {
    let currentUser = await this.userService.loginUser(this.loginUser);
    if (currentUser) {
      this.loginUser = new Login();
      this.sendLoggedInUser();
      this.modalService.dismissAll();
    }

    /* this.userService.loginUser(this.loginUser).subscribe((value) => {
      console.log(value);
    }) */
  }

  openRegisterModal(signupModal: any) {
    this.modalService.dismissAll();
    this.modalService.open(signupModal, { centered: true, size: 'sm' });
  }

  sendLoggedInUser() {
    this.loggedInUser.emit(this.currentUser);
  }

  dismissModal() {
    this.closeModal.emit();
  }

  dismissAll() {
    this.modalService.dismissAll();
  }
}
