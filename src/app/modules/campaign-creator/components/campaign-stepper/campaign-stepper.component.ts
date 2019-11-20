import { Component, SkipSelf, Optional, ViewChild } from '@angular/core';
import { CampaignModel, TargetingModel } from '@models/campaign.model';
import { CampaignService } from '@services/campaign.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { TargetingFormComponent } from '../targeting-form/targeting-form.component';
import { SegmentFormComponent } from '../segment-form/segment-form.component';
import moment from 'moment';

@Component({
  selector: 'app-campaign-stepper',
  templateUrl: './campaign-stepper.component.html',
  styleUrls: ['./campaign-stepper.component.scss'],
  providers: [{ provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
  { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } }
  ]
})
export class CampaignStepperComponent {

  @ViewChild(TargetingFormComponent, { static: false }) targetingComponent: TargetingFormComponent;
  @ViewChild(SegmentFormComponent, { static: false }) segmentComponent: SegmentFormComponent;

  summeryData: CampaignModel;

  constructor(
    @SkipSelf() @Optional() public _campaignService: CampaignService
  ) { }

  get targeting() {
    return this.targetingComponent ? this.targetingComponent.form : null;
  }

  get segment() {
    return this.segmentComponent ? this.segmentComponent.form : null;
  }

  getSummeryData() {
    const data: CampaignModel = {} as CampaignModel;
    if (this._campaignService.currentCampain && this._campaignService.currentCampain.id) {
       data.id = this._campaignService.currentCampain.id ; }
    data.targeting = this.targetingComponent.form.getRawValue() as unknown as TargetingModel;
    data.targeting.startDate = moment(data.targeting.startDate).toDate();
    data.targeting.endDate = moment(data.targeting.endDate).toDate();
    data.segments = this.segmentComponent.selectedDevices;
    this.summeryData = data;
  }

  get summery(): CampaignModel {
    return this.summeryData;
  }

  set summery(data: CampaignModel) {
    this.summeryData = data;
  }

  saveCampaign() {
    this._campaignService.saveCampaign(this.summeryData);
  }
}
