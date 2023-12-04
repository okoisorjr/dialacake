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
} from '@angular/fire/firestore';
import { User } from '../pages/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: User = new User();
  user: any;
  currentUserCredentials: any;
  usersRef = collection(this.firestore, 'users');
  constructor(
    private http: HttpClient,
    private auth: Auth,
    private firestore: Firestore
  ) {}

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
      this.currentUser.id = result.user.uid;
      this.currentUser.fullname = result.user.displayName;
      this.currentUser.email = result.user.email;
      this.currentUser.verified = result.user.emailVerified;
      this.getUser();
    }
    return this.auth.currentUser;
  }

  async getUser() {
    const userRef = doc(this.firestore, `users/${this.currentUser.id}`);
    let user_detail = (await getDoc(userRef)).data();

    if (user_detail) {
      this.currentUser.phone = user_detail['phone'];
    }
  }

  async getAllUsers() {
    let users: any[] = [];
    const q = query(this.usersRef);
    let all_users = await getDocsFromServer(q);
    all_users.forEach((doc) => {
      users.push(doc.data());
    });

    return users;
  }
}
