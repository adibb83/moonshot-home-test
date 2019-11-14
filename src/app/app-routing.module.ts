import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '',   redirectTo: '/campaign-creator', pathMatch: 'full' },
  { path: 'authentication',
  loadChildren: () => import('@modules/Authentication/authentication-routing.module')
  .then(m => m.AuthenticationRoutingModule)
},
{ path: 'campaign-creator',
  loadChildren: () => import('@modules/campaign-creator/campaign-creator.module')
  .then(m => m.CampaignCreatorModule)
},
{ path: 'campaign-manager',
  loadChildren: () => import('@modules/campaign-manager/campaign-manager.module')
  .then(m => m.CampaignManagerModule)
},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
