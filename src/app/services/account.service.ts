import { Injectable } from '@angular/core';
import { Observable, pipe, Subject } from 'rxjs';
import { AccountLoginModel } from '@models/account-login.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { User, UserInfo } from 'firebase/app';
import { ProgressDialogService } from '@services/progress-dialog.service';


import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';
export const googleAuthProvider = new auth.GoogleAuthProvider();

export enum AuthProvider {
  EmailAndPassword = 'firebase',
  Google = 'google',
}

@Injectable()
export class AccountService {
  user$: Observable<User>;
  user: User;
  public loginError$ = new Subject<string>();
  constructor(
    private _router: Router,
    private _afAuth: AngularFireAuth,
    private _progressDialogService: ProgressDialogService
  ) { }


  public async signInWith(provider: AuthProvider, credentials?: AccountLoginModel) {
    try {
      this._progressDialogService.loading(true);
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
    // tslint:disable-next-line:no-string-literal
    localStorage.setItem('userId', userCredential.additionalUserInfo.profile['id']);
    this._progressDialogService.loading(false);
    this._router.navigate(['campaign-manager', 'campaigns-dataGrid']);
  }

  handleError(error: any) {
    this._progressDialogService.loading(false);
    this.loginError$.next(error);
    console.error(error);
  }

  logout() {
    localStorage.removeItem('userId');
    this._afAuth.auth.signOut();
  }
}

