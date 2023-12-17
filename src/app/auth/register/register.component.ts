import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  serverTimestamp,
  setDoc,
} from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Register } from 'src/app/pages/models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Output() loginClose = new EventEmitter();
  @Output() isLoggedIn = new EventEmitter();

  submitted: boolean = false;
  newUser: Register = new Register();
  successMessage!: string;
  errorMessage!: string;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

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
          this.successMessage =
            'Congratulations! Account created successfully.';
          this.newUser = new Register();
          this.isLoggedIn.emit(this.successMessage);
        });
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.log(error);
      });
  }

  openLoginModal(loginModal: any) {
    this.modalService.dismissAll();
    this.modalService.open(loginModal, { centered: true, size: 'sm' });
  }

  dismissModal() {
    this.closeModal.emit();
  }

  dismissAll() {
    this.modalService.dismissAll();
    this.newUser = new Register();
  }
}
