import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { AuthGuard } from '@services/auth-guard.service';

const routes: Routes = [
  { path: '',   redirectTo: '/authentication', pathMatch: 'full' },
  { path: 'authentication',
  loadChildren: () => import('@modules/Authentication/authentication-routing.module')
  .then(m => m.AuthenticationRoutingModule)
},

{ path: 'campaign-creator',
  loadChildren: () => import('@modules/campaign-creator/campaign-creator.module')
  .then(m => m.CampaignCreatorModule),
  canActivate: [AuthGuard]
},

{ path: 'campaign-manager',
  loadChildren: () => import('@modules/campaign-manager/campaign-manager.module')
  .then(m => m.CampaignManagerModule),
  canActivate: [AuthGuard]
},

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
