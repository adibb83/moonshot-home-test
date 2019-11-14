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
export class CampaignStepperComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder ,
    @SkipSelf() @Optional() public _campaignService: CampaignService
    ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
