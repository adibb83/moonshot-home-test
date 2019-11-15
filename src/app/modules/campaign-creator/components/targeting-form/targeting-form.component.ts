import { Component, forwardRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormBuilder, ControlValueAccessor, Validators, NG_VALIDATORS, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TargetingModel } from '@models/campaign.model';

import { multiplicationInputsValidator, CrossFieldErrorMatcher } from '@shared/validators/validators';
import { CampaignService } from '@services/campaign.service';

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

  error: any;
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

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      budget: ['', Validators.required],
      bid: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    }, { validator: multiplicationInputsValidator('budget', 'bid', 10)});

    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
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

  validate(_: FormControl) {
    return this.form.valid ? null : { targeting: { valid: false, }, };
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

  clearError() {
    if (this.error) { this.error = null; }
  }
}
