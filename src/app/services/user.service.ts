import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocsFromServer,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Address, User } from '../pages/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: any;
  user: any;
  currentUserCredentials: any;
  usersRef = collection(this.firestore, 'users');
  constructor(
    private http: HttpClient,
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.auth.beforeAuthStateChanged((user) => {
      this.user = user;
    });
  }

  async loginUser(user: any) {
    const result = await signInWithEmailAndPassword(
      this.auth,
      user.email,
      user.password
    );
    if (result) {
      this.user = result.user;
      this.currentUserCredentials =
        GoogleAuthProvider.credentialFromResult(result);
      this.currentUser.verified = result.user.emailVerified;
    }
    this.currentUser = await this.fetchUserAccountDetails();
    return this.currentUser;
  }

  async fetchUserAccountDetails() {
    const docRef = doc(this.firestore, `users/${this.auth.currentUser?.uid}`);
    let user = (await getDoc(docRef)).data();
    this.currentUser = user;

    return user;
  }

  /* async getUser() {
    const userRef = doc(this.firestore, `users/${this.currentUser.id}`);
    let user_detail = (await getDoc(userRef)).data();

    if (user_detail) {
      this.currentUser.phone = user_detail['phone'];
    }
  } */

  async getAllUsers() {
    let users: any[] = [];
    const q = query(this.usersRef);
    let all_users = await getDocsFromServer(q);
    all_users.forEach((doc) => {
      users.push(doc.data());
    });

    return users;
  }

  async updateUserPhone(data: string) {
    let result = await updateDoc(
      doc(this.firestore, `users/${this.auth.currentUser?.uid}`),
      { phone: data }
    );

    return result;
  }

  async saveAddress(userId: string, data: any) {
    let result = await updateDoc(doc(this.firestore, `users/${userId}`), {
      ...data,
    });

    return result;
  }
}
