import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from '@modules/Authentication/components/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent},
  { path: 'login', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
