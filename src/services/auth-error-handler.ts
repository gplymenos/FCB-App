import { FirebaseError } from 'firebase/app';

export function handleAuthError(error: FirebaseError) {
  console.log('error');
  console.log(error.code);
}
