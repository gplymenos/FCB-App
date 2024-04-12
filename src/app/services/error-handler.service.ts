import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  handleError(error: any): string {
    let message = 'An unexpected error occurred.';

    if (!error.code) {
      console.error('An error occurred:', error);
      return message; // Return a generic message if the error doesn't have a code
    }

    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'This email address is already in use.';
        break;
      case 'auth/invalid-email':
        message = 'This email address is invalid.';
        break;
      case 'auth/invalid-credential':
        message = 'These credentials are invalid. Please try again.';
        break;
      case 'auth/operation-not-allowed':
        message = 'Email/password accounts are not enabled.';
        break;
      case 'auth/weak-password':
        message = 'The password is too weak.';
        break;
      case 'auth/user-not-found':
        message = 'No user found with this email.';
        break;
      case 'auth/wrong-password':
        message = 'Wrong password. Please try again.';
        break;
      case 'auth/too-many-requests':
        message = 'Too many attempts. Please try again later.';
        break;
      // Add more error codes and custom messages as needed
      default:
        console.error('An error occurred:', error);
        message = 'An unexpected error occurred. Please try again.';
    }

    // Log or show the error message as needed
    console.error(message);
    return message;
  }
}
