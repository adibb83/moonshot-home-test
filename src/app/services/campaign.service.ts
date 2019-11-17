import { Injectable, SkipSelf, Optional } from '@angular/core';
import { CampaignModel, SegmentModel } from '@models/campaign.model';
import { Observable} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as _ from 'lodash';
import { GlobalAppService } from '@services/global-app.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private campaingsCollection$: AngularFirestoreCollection<CampaignModel>;
  private updateCampaignDoc: AngularFirestoreDocument<CampaignModel>;
  public currentCampain: CampaignModel;

  public allCampaings$: Observable<CampaignModel[]>;

  public sagmentsList: SegmentModel[] = [
    { id: '1', name: 'mobile' },
    { id: '2', name: 'tablet' },
    { id: '3', name: 'desktop' },
  ];

  constructor(
    private _angularFirestore: AngularFirestore,
    public _globalAppService: GlobalAppService) {
    this.campaingsCollection$ = this._angularFirestore.collection<CampaignModel>('campaigns');
    this.allCampaings$ = this.campaingsCollection$.valueChanges();
  }

  addCampaign(campaign: CampaignModel) {
    const id = this._angularFirestore.createId();
    campaign.id = id;
    this.campaingsCollection$.add(campaign);
    this._globalAppService.openSnackBar(`Campagin saved. Id: ${id}`);
  }

  updateCampaign(campaign: CampaignModel) {
    this.updateCampaignDoc = this._angularFirestore.doc<CampaignModel>(campaign.id);
    this.updateCampaignDoc.update(campaign);
  }

  saveCampaign(campaign: CampaignModel) {
    if (_.isEmpty(campaign.id)) {
      this.addCampaign(campaign);
    } else {
      this.updateCampaign(campaign);
    }
  }

  getAllCampains(): Observable<CampaignModel[]> {
    return this.allCampaings$;
  }
}
