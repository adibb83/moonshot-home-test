import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignCreatorRoutingModule } from './campaign-creator-routing.module';
import { CampaignStepperComponent } from './components/campaign-stepper/campaign-stepper.component';

// material moules
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

// forms modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CampaignStepperComponent],
  imports: [
    CommonModule,
    CampaignCreatorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: []
})
export class CampaignCreatorModule { }
