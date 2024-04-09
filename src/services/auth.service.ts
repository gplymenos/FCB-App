import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseError } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { Subject } from 'rxjs';
import { handleAuthError } from './auth-error-handler';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInUser: firebase.User | null = null;
  loggedUserChanged = new Subject<firebase.User | null>();
  constructor(private afAuth: AngularFireAuth, public dialog: MatDialog) {}

  signInWithEmail(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // User signed in successfully
        this.dialog.closeAll();
      })
      .catch((error: FirebaseError) => {
        handleAuthError(error);
      });
  }

  signup(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // User created successfully
        alert('Successfully Created User');
        if (result.user) {
          result.user
            .sendEmailVerification()
            .then(() => {
              // Email verification sent
            })
            .catch((error) => {
              handleAuthError(error);
            });
        }
      })
      .catch((error) => {
        handleAuthError(error);
      });
  }

  subscribeAuthentication() {
    return this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.loggedInUser = user;
        this.loggedUserChanged.next(this.loggedInUser);
      } else {
        // User is not signed in
        this.loggedInUser = null;
      }
    });
  }

  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        this.loggedInUser = null;
        this.loggedUserChanged.next(this.loggedInUser);
      })
      .catch((error) => {
        handleAuthError(error);
      });
  }

  getLoggedUser() {
    return this.loggedInUser ? { ...this.loggedInUser } : null;
  }
}
