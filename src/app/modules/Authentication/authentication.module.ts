import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';
import { AuthenticationRoutingModule } from './authentication-routing.module';

// firebase auth
import { AngularFireModule  } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { LoginPageComponent } from './components/login-page/login-page.component';

// material use
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
// forms modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class AuthenticationModule { }
