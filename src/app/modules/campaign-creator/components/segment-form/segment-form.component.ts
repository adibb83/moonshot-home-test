import { Component, forwardRef, OnDestroy, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormBuilder, ControlValueAccessor, NG_VALIDATORS} from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { SegmentModel } from '@models/campaign.model';
import { CampaignService } from '@services/campaign.service';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material';
import { validateRequired } from '@shared/validators/validators';
import * as _ from 'lodash';

@Component({
  selector: 'app-segment-form',
  templateUrl: './segment-form.component.html',
  styleUrls: ['./segment-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SegmentFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SegmentFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentFormComponent implements AfterViewInit, ControlValueAccessor, OnDestroy {
  form: FormGroup;
  subscriptions: Subscription[] = [];
  devices: SegmentModel[];
  selectedDevices: SegmentModel[] = [];
  filteredDevices$: Observable<SegmentModel[]>;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('deviceInput', { static: false }) deviceInput: ElementRef;
  @ViewChild(MatAutocompleteTrigger, { static: true }) autocompleteTrigger: MatAutocompleteTrigger;

  get value(): SegmentModel {
    return this.form.value;
  }

  set value(value: SegmentModel) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get segmentFormControls() {
    return this.form.controls.segment;
  }


  constructor(
    public _campaignService: CampaignService,
    private formBuilder: FormBuilder) {
    this.buildForm();
    this.formValueChange();
    this.selectDataInit();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      segment: [this.selectedDevices, [validateRequired]]
    });
  }


  ngAfterViewInit() {
    if (this._campaignService.currentCampain && !_.isEmpty(this._campaignService.currentCampain.id)) {
      this.form.controls.segment.setValue(this._campaignService.currentCampain.segments);
      this.selectedDevices = this._campaignService.currentCampain.segments;
      console.log(this.form.controls.segment);
    } else {
      this.form.controls.segment.setValue(this.selectedDevices);
    }
  }

  formValueChange() {
    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );

  }

  selectDataInit() {
    this.devices = this._campaignService.sagmentsList;
    this.filteredDevices$ = of(this.devices);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (event.option.value && !this.selectedDevices.find(e => e.name === event.option.value.name.trim())) {
      this.form.controls.segment.setErrors(null);
      this.selectedDevices.push(event.option.value);
      this.form.controls.segment.setValue(this.selectedDevices);
      this.form.controls.segment.updateValueAndValidity();
      this.form.controls.segment.markAsDirty();
    }
    this.deviceInput.nativeElement.value = '';
  }

  remove(device, indx): void {
    this.selectedDevices.splice(indx, 1);
    const controller = this.form.controls.segment;
    const index = this.selectedDevices.indexOf(device, 0);
    if (index > -1) {
      this.selectedDevices.splice(index, 1);
      this.form.controls.segment.setValue(this.selectedDevices);
    }
    controller.updateValueAndValidity();
    controller.markAsDirty();
    console.log('remove select', this.form.controls, this.selectedDevices);
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

  openAutocomplite() {
    this.autocompleteTrigger.openPanel();
  }
}
