import { Injectable, SkipSelf, Optional } from '@angular/core';
import { CampaignModel, SegmentModel } from '@models/campaign.model';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as _ from 'lodash';
import { GlobalAppService } from '@services/global-app.service';
import { ProgressDialogService } from '@services/progress-dialog.service';


@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private campaingsCollection$: AngularFirestoreCollection<CampaignModel>;
  private updateCampaignDoc: AngularFirestoreDocument<CampaignModel>;
  public currentCampain: CampaignModel;
  error: any | null;
  public allCampaings$: Observable<CampaignModel[]>;

  public sagmentsList: SegmentModel[] = [
    { id: '1', name: 'mobile' },
    { id: '2', name: 'tablet' },
    { id: '3', name: 'desktop' },
  ];

  constructor(
    private _angularFirestore: AngularFirestore,
    public  _globalAppService: GlobalAppService,
    public _progressDialogService: ProgressDialogService) {
    this.initCampaigns();
  }

  initCampaigns() {
    this.campaingsCollection$ = this._angularFirestore.collection<CampaignModel>('campaigns');
    this.allCampaings$ = this.campaingsCollection$.valueChanges();
  }

  public async addCampaign(campaign: CampaignModel) {
    try {
      this._progressDialogService.loading(true);
      const id: string = this._angularFirestore.createId();
      campaign.id = id;
      await this.campaingsCollection$.add(campaign);
      this._globalAppService.openSnackBar(`Campagin saved. Id: ${id}`);
      this._progressDialogService.loading(false);
    } catch (err) {
      this.handleError(err);
    }
  }


  public async updateCampaign(campaign: CampaignModel) {
    try {
      this._progressDialogService.loading(true);
      this.updateCampaignDoc = this._angularFirestore.collection('campaigns').doc(campaign.id);
      await this.updateCampaignDoc.set(campaign, { merge: true });
      this._globalAppService.openSnackBar(`Campagin Updated`);
      this._progressDialogService.loading(false);
    } catch (err) {
      this.handleError(err);
    }
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

  restartCurrentCampaign() {
    this.currentCampain = {} as CampaignModel;
  }

  handleError(error: any) {
    this._progressDialogService.loading(false);
    this._globalAppService.openSnackBar(`oops an error occurred console logged`);
    console.error(error);
  }


}




  // addCampaign(campaign: CampaignModel) {
  //   this.error = null;
  //   console.log(campaign);
  //   const id = this._angularFirestore.createId();
  //   campaign.id = id;
  //   this.campaingsCollection$.add(campaign)
  //   .catch(error => {console.log(error); this.handleError(error); this.error = error; });
  //   if (this.error === null) {this._globalAppService.openSnackBar(`Campagin saved. Id: ${id}`); }
  // }

  // updateCampaign(campaign: CampaignModel) {
  //   this.error = null;
  //   this.updateCampaignDoc = this._angularFirestore.doc<CampaignModel>(campaign.id);
  //   this.updateCampaignDoc.update(campaign).catch(error => { this.handleError(error); this.error = error; });
  //   if (this.error === null) { this._globalAppService.openSnackBar(`Campagin Updated`); }
  // }
