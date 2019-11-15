import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { AccountLoginModel } from '@models/account-login.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User, UserInfo } from 'firebase/app';

import UserCredential = firebase.auth.UserCredential;
export const googleAuthProvider = null;
// change to and fix => export const googleAuthProvider = new auth.GoogleAuthProvider();
export enum AuthProvider {
    EmailAndPassword = 'firebase',
    Google = 'google',
  }

@Injectable()
export class AccountService {
    user$: Observable<User>;
    user: User;

    constructor(
        private _afAuth: AngularFireAuth
    ) { }


    public async signInWith(provider: AuthProvider, credentials?: AccountLoginModel) {
        try {
          let signInResult: UserCredential | any;
          switch (provider) {
            case AuthProvider.EmailAndPassword:
              signInResult = await this._afAuth.auth.signInWithEmailAndPassword(credentials.Email, credentials.Password) as UserCredential;
              break;
            case AuthProvider.Google:
              signInResult = await this._afAuth.auth.signInWithPopup(googleAuthProvider) as UserCredential;
              break;
            default:
              throw new Error(`${AuthProvider[provider]} is not available as auth provider`);
          }
          await this.handleSuccess(signInResult);
        } catch (err) {
          this.handleError(err);
        }
      }

      async handleSuccess(userCredential: UserCredential) {
        // this.onSuccessEmitter.next(userCredential.user);
        // if (this.config.enableFirestoreSync) {
        //   try {
        //     await this._fireStoreService.updateUserData(this.parseUserInfo(userCredential.user));
        //   } catch (e) {
        //     console.error(`Error occurred while updating user data with firestore: ${e}`);
        //   }
        // }
        // if (this.config.toastMessageOnAuthSuccess) {
        //   const fallbackMessage = `Hello ${userCredential.user.displayName ? userCredential.user.displayName : ''}!`;
        //   this.showToast(this.messageOnAuthSuccess || fallbackMessage);
        // }
        console.log(userCredential);
      }

      handleError(error: any) {
        console.error(error);
      }
}

