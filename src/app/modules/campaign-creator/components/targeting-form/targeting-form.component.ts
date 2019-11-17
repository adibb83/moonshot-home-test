import { Component, forwardRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormBuilder, ControlValueAccessor, Validators, NG_VALIDATORS, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TargetingModel } from '@models/campaign.model';

import { multiplicationInputsValidator, CrossFieldErrorMatcher } from '@shared/validators/validators';
import { CampaignService } from '@services/campaign.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-targeting-form',
  templateUrl: './targeting-form.component.html',
  styleUrls: ['./targeting-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TargetingFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TargetingFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetingFormComponent implements ControlValueAccessor, OnDestroy {

  form: FormGroup;
  subscriptions: Subscription[] = [];
  errorMatcher = new CrossFieldErrorMatcher();

  get value(): TargetingModel {
    return this.form.value;
  }

  set value(value: TargetingModel) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get targetingFormControls() {
    return this.form.controls;
  }

  constructor(
    public _campaignService: CampaignService,
    private formBuilder: FormBuilder) {

    this.createForm();
    this.formChangesListener();
    this.editDataInject();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      budget: ['', Validators.required],
      bid: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    }, { validator: multiplicationInputsValidator('budget', 'bid', 10) });
  }

  formChangesListener() {
    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  editDataInject() {
    if (this._campaignService.currentCampain && !_.isEmpty(this._campaignService.currentCampain.id)) {
      console.log(this._campaignService.currentCampain.targeting.startDate);
      this.form.controls.name.setValue(this._campaignService.currentCampain.targeting.name);
      this.form.controls.budget.setValue(this._campaignService.currentCampain.targeting.budget);
      this.form.controls.bid.setValue(this._campaignService.currentCampain.targeting.bid);
      this.form.controls.startDate.setValue(this._campaignService.currentCampain.targeting.startDate);
      this.form.controls.endDate.setValue(this._campaignService.currentCampain.targeting.endDate);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  reset() {
    this.form.reset();
  }

  getMessge(): string {
    if (this.form.hasError('multiplicationMissmatch')) {
      return `Budget must be 10 * bid`;
    } else if (this.targetingFormControls.bid.errors.required) {
      return 'bid is required';
    }
    return '';
  }
}
