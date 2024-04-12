// File: error-handler.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handleError', () => {
    it('should return a custom message for auth/email-already-in-use', () => {
      const error = { code: 'auth/email-already-in-use' };
      const expectedMessage = 'This email address is already in use.';
      expect(service.handleError(error)).toEqual(expectedMessage);
    });

    it('should return a custom message for auth/invalid-email', () => {
      const error = { code: 'auth/invalid-email' };
      const expectedMessage = 'This email address is invalid.';
      expect(service.handleError(error)).toEqual(expectedMessage);
    });

    it('should return a custom message for auth/invalid-credential', () => {
      const error = { code: 'auth/invalid-credential' };
      const expectedMessage =
        'These credentials are invalid. Please try again.';
      expect(service.handleError(error)).toEqual(expectedMessage);
    });

    it('should return a custom message for auth/operation-not-allowed', () => {
      const error = { code: 'auth/operation-not-allowed' };
      const expectedMessage = 'Email/password accounts are not enabled.';
      expect(service.handleError(error)).toEqual(expectedMessage);
    });

    it('should return a custom message for auth/weak-password', () => {
      const error = { code: 'auth/weak-password' };
      const expectedMessage = 'The password is too weak.';
      expect(service.handleError(error)).toEqual(expectedMessage);
    });

    it('should return a custom message for auth/user-not-found', () => {
      const error = { code: 'auth/user-not-found' };
      const expectedMessage = 'No user found with this email.';
      expect(service.handleError(error)).toEqual(expectedMessage);
    });

    it('should return a custom message for auth/wrong-password', () => {
      const error = { code: 'auth/wrong-password' };
      const expectedMessage = 'Wrong password. Please try again.';
      expect(service.handleError(error)).toEqual(expectedMessage);
    });

    it('should return a custom message for auth/too-many-requests', () => {
      const error = { code: 'auth/too-many-requests' };
      const expectedMessage = 'Too many attempts. Please try again later.';
      expect(service.handleError(error)).toEqual(expectedMessage);
    });

    it('should return a generic message for an unknown error code', () => {
      const error = { code: 'auth/some-unknown-error' };
      const expectedMessage = 'An unexpected error occurred. Please try again.';
      expect(service.handleError(error)).toEqual(expectedMessage);
    });

    it('should return a generic message if error does not have a code', () => {
      const error = { message: 'Some error without a code' };
      const expectedMessage = 'An unexpected error occurred.';
      expect(service.handleError(error)).toEqual(expectedMessage);
    });
  });
});
