import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInUser: firebase.User | null = null;
  loggedUserChanged = new Subject<firebase.User | null>();
  constructor(private afAuth: AngularFireAuth) {}

  signInWithEmail(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // User signed in successfully
        alert('Successfully Signed In');
      })
      .catch((error: Error) => {
        console.log(error);
        alert(error.message);
      });
  }

  signUpWithEmail(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // User created successfully
        alert('Successfully Created User');
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        alert(error.message);
      });
  }

  subscribeAuthentication() {
    return this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.loggedInUser = user;
        console.log('signed in');
        console.log(user);
      } else {
        // User is not signed in
        this.loggedInUser = null;
        console.log('signed out');
      }
    });
  }

  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        this.loggedInUser = null;
      })
      .catch((error) => {
        // Handle Errors here.
      });
  }

  getLoggedUser() {
    return this.loggedInUser ? { ...this.loggedInUser } : null;
  }
}
