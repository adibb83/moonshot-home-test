import { Component, OnInit, SkipSelf, Optional } from '@angular/core';
import { CampaignModel } from '@models/campaign.model';
import { CampaignService } from '@services/campaign.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-campaign-stepper',
  templateUrl: './campaign-stepper.component.html',
  styleUrls: ['./campaign-stepper.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { showError: true }
  }]
})
export class CampaignStepperComponent  {
  campaignForm: FormGroup;


  constructor(
    private _formBuilder: FormBuilder ,
    @SkipSelf() @Optional() public _campaignService: CampaignService
    ) {

      this.campaignForm = this._formBuilder.group({
        targeting: [],
        segment: []
      });
    }

    submit() {
      console.log(this.campaignForm.value);
    }

    resetForm() {
      this.campaignForm.reset();
    }
}
