import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignCreatorRoutingModule } from './campaign-creator-routing.module';
import { CampaignStepperComponent } from './components/campaign-stepper/campaign-stepper.component';

// material moules
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';

// forms modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TargetingFormComponent } from './components/targeting-form/targeting-form.component';
import { SegmentFormComponent } from './components/segment-form/segment-form.component';
import { SummeryComponent } from './components/summery/summery.component';

@NgModule({
  declarations: [
    CampaignStepperComponent,
    TargetingFormComponent,
    SegmentFormComponent,
    SummeryComponent],
  imports: [
    CommonModule,
    CampaignCreatorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule
  ],
  providers: []
})
export class CampaignCreatorModule { }
