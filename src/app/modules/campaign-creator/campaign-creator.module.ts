import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignCreatorRoutingModule } from './campaign-creator-routing.module';
import { CampaignStepperComponent } from './components/campaign-stepper/campaign-stepper.component';

// material moules
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card'; 
import {MatListModule} from '@angular/material/list'; 

// forms modules
import { ReactiveFormsModule } from '@angular/forms';
import { TargetingFormComponent } from './components/targeting-form/targeting-form.component';
import { SegmentFormComponent } from './components/segment-form/segment-form.component';
import { SummeryComponent } from './components/summery/summery.component';
import { MatNativeDateModule, MatIconModule } from '@angular/material';

// helpers
import { ErrorPanelComponent } from '@shared/components/helpers/error-panel/error-panel.component';
import { ExtractModelErrorsPipe } from '../../pipes/extract-model-errors.pipe'

@NgModule({
  declarations: [
    CampaignStepperComponent,
    TargetingFormComponent,
    SegmentFormComponent,
    SummeryComponent,
    ErrorPanelComponent,
    ExtractModelErrorsPipe,
    ],
  imports: [
    CommonModule,
    CampaignCreatorRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
  ],
  providers: []
})
export class CampaignCreatorModule { }
