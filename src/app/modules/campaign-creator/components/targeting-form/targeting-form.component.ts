import { Component, OnInit } from '@angular/core';
import { CampaignService } from '@services/campaign.service';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-targeting-form',
  templateUrl: './targeting-form.component.html',
  styleUrls: ['./targeting-form.component.scss']
})
export class TargetingFormComponent implements OnInit {
  private error: any;
  public success: any;
  public name: FormControl;
  public budget: FormControl;
  public bid: FormControl;
  public startDate: FormControl;
  public endDate: FormControl;
  public targetingForm: FormGroup;
  budgetFieldHassError: boolean;
  constructor(public _campaignService: CampaignService) { }

  ngOnInit() {
    this.createControls();
    this.createForm();
    if (this._campaignService.currentCampain.id !== null) { this.onEditForm(); }
  }

  createControls() {
    this.name = new FormControl(null, [Validators.required]);
    this.budget = new FormControl(null, [Validators.required]);
    this.bid = new FormControl(null, [Validators.required]);
    this.startDate = new FormControl(null, [Validators.required]);
    this.endDate = new FormControl(null, Validators.required);
  }

  createForm() {
    this.targetingForm = new FormGroup({
      name: this.name,
      budget: this.budget,
      bid: this.bid,
      startDate: this.startDate,
      endDate: this.endDate,
    });

    this.targetingForm.get('budget').setValidators(this.greaterThan('bid'));
    this.targetingForm.valueChanges.subscribe(() => {
      if (this.targetingForm.get('budget').hasError('lessThan')) {
        this.budgetFieldHassError = true;
      } else {
        this.budgetFieldHassError = false;
      }
    });

    this.targetingForm.get('bid').valueChanges.subscribe(() =>
      console.log('ngOnInit: budget must be bigger then bid * 10 ',
      this.targetingForm.get('budget').hasError('lessThan')));
  }

  onEditForm() {
    this.name.setValue(this._campaignService.currentCampain.targeting.name);
    this.budget.setValue(this._campaignService.currentCampain.targeting.budget);
    this.bid.setValue(this._campaignService.currentCampain.targeting.bid);
    this.startDate.setValue(this._campaignService.currentCampain.targeting.startDate);
    this.endDate.setValue(this._campaignService.currentCampain.targeting.endDate);
  }

  greaterThan(field: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const group = control.parent;
      const fieldToCompare = group.get(field);
      const isLessThan = Number(fieldToCompare.value) * 10 <= Number(control.value);
      return isLessThan ? {lessThan: {value: control.value}} : null;
    };
  }


}
