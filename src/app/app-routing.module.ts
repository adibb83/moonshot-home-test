import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '',   redirectTo: '/authentication', pathMatch: 'full' },
  { path: 'authentication', loadChildren: () => import(`@modules/Authentication/authentication-routing.module`).then(m => m.AuthenticationRoutingModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
