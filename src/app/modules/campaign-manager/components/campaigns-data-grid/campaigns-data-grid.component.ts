import { Component, OnInit, Optional, SkipSelf } from '@angular/core';
import { CampaignService } from '@services/campaign.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { CampaignModel } from '@models/campaign.model';
import { Router } from '@angular/router';
import { debounceTime, switchMap, takeUntil, skip, map, filter } from 'rxjs/operators';
import * as _ from 'lodash';


@Component({
  selector: 'app-campaigns-data-grid',
  templateUrl: './campaigns-data-grid.component.html',
  styleUrls: ['./campaigns-data-grid.component.scss']
})
export class CampaignsDataGridComponent implements OnInit {
  private autocomplete;
  displayedColumns: string[] =
    [
      'name',
      'startDate',
      'endDate',
      'devices',
      'budget',
      'bid',
      'status',
      'actions'
    ];
  private term$ = new BehaviorSubject<string>('');
  private selectedInput: string | null = '';

  dataSource$: Observable<CampaignModel[]>;

  constructor(
    @SkipSelf() @Optional() public _campaignService: CampaignService,
    private _router: Router) { }

  ngOnInit() {
    this.autoCompliteSearch();
  }

  autoCompliteSearch() {
    this.autocomplete = (time, selector) => (source$) =>
      source$.pipe(
        debounceTime(time),
        switchMap((...args: any[]) =>
          selector(...args)
            .pipe(
              takeUntil(
                source$
                  .pipe(
                    skip(1)
                  )
              )
            )
        )
      );

    this.dataSource$ = this.term$.pipe(
      this.autocomplete(500, (term => this.fetch()))
    );
  }

  fetch(): Observable<CampaignModel[]> {
    return this._campaignService.getAllCampains()
      .pipe(
        map((res: CampaignModel[]) =>
        !_.isEmpty(this.selectedInput)  ?
        res.filter((obj: CampaignModel) => { return (Object.keys(obj.targeting)
              .filter(key => { return obj.targeting[key]
                  .toString()
                  .toLowerCase()
                  .includes(this.selectedInput.toLowerCase());
              })); }) : res));
  }

  // fetch(): Observable<CampaignModel[]> {
  //   return this._campaignService.getAllCampains()
  //     .pipe(
  //       map((res: CampaignModel[]) =>
  //       !_.isEmpty(this.selectedInput) ?
  //       res.filter((obj: CampaignModel) => obj.targeting.name.toLowerCase() === this.selectedInput.toLowerCase()) : res));
  // }

  editCampaign(row: CampaignModel) {
    this._campaignService.currentCampain = row;
    this._router.navigate(['campaign-creator']);
  }

}
