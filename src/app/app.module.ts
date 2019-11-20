import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// project modules
import { CoreModule } from '@modules/core/core.module';
import { AuthenticationModule } from '@modules/Authentication/authentication.module';
import { CampaignCreatorModule } from '@modules/campaign-creator/campaign-creator.module';
import { CampaignManagerModule } from '@modules/campaign-manager/campaign-manager.module';
import { SnackBarComponentComponent } from '@shared/components/snack-bar-component/snack-bar-component.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MAT_LABEL_GLOBAL_OPTIONS, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { ProgressSpinnerComponent} from '@shared/components/helpers/progress-spinner/progress-spinner.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { MainNavComponent } from '@shared/components/main-nav/main-nav.component';

// services
import { CampaignService } from '@services/campaign.service';
import { AccountService } from '@services/account.service';
import { GlobalAppService } from '@services/global-app.service';
import { LogOutService } from '@services/log-out.service';
import { AuthTokenService } from '@services/auth-token.service';
import { ProgressDialogService } from '@services/progress-dialog.service';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule} from '@angular/fire/auth';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ProgressSpinnerComponent,
    MainNavComponent,
    SnackBarComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AuthenticationModule,
    CampaignCreatorModule,
    CampaignManagerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  entryComponents: [
    ProgressSpinnerComponent,
    SnackBarComponentComponent
  ],
  providers: [
    AuthTokenService,
    GlobalAppService,
    AccountService,
    CampaignService,
    ProgressDialogService,
    LogOutService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 4500}},
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}},
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}

