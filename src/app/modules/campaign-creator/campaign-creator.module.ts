import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheardModule } from '@modules/sheard/sheard.module';
import { CampaignCreatorRoutingModule } from './campaign-creator-routing.module';
import { CampaignStepperComponent } from './components/campaign-stepper/campaign-stepper.component';

// material moules
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

// forms modules
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TargetingFormComponent } from './components/targeting-form/targeting-form.component';
import { SegmentFormComponent } from './components/segment-form/segment-form.component';
import { SummeryComponent } from './components/summery/summery.component';
import { MatNativeDateModule, MatIconModule, MatSelectModule } from '@angular/material';

// services

import { AuthGuard } from '@services/auth-guard.service';
import { AuthTokenService } from '@services/auth-token.service';
import { MomentDateModule } from '@angular/material-moment-adapter';


@NgModule({
  declarations: [
    CampaignStepperComponent,
    TargetingFormComponent,
    SegmentFormComponent,
    SummeryComponent,
    ],
  imports: [
    CommonModule,
    CampaignCreatorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SheardModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MomentDateModule,
  ],
  providers: [AuthTokenService , AuthGuard]
})
export class CampaignCreatorModule { }
