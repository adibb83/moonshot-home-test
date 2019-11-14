import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignStepperComponent } from './components/campaign-stepper/campaign-stepper.component';


const routes: Routes = [
  { path: '', component: CampaignStepperComponent},
  { path: 'campaign-stepper', component: CampaignStepperComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignCreatorRoutingModule { }
