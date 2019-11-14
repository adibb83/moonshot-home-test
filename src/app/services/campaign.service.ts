import { Injectable } from '@angular/core';
import { CampaignModel, SegmentModel, TargetingModel } from '@models/campaign.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  public currentCampain: CampaignModel;

  public allCampaings: CampaignModel[];

  public sagmentsList: SegmentModel[] = [
    { id: '1', name: 'mobile' },
    { id: '2', name: 'tablet' },
    { id: '3', name: 'desktop' },
  ];

  constructor(private _httpClient: HttpClient) { }

  addCampaign(campaign: CampaignModel) {

  }

  updateCampaign(campaign: CampaignModel) {

  }

  saveCampaign(campaign: CampaignModel) {
     if (_.isEmpty(campaign.id)) {
        this.addCampaign(campaign);
      } else {
        this.updateCampaign(campaign);
      }
  }

  getAllCampains(): Observable<CampaignModel[]> {
    return of(this.allCampaings);
  }
}
