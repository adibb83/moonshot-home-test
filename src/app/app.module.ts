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

import { ProgressSpinnerComponent} from '@shared/components/helpers/progress-spinner/progress-spinner.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { MainNavComponent } from '@shared/components/main-nav/main-nav.component';

// pipes

import { ExtractModelErrorsPipe } from './pipes/extract-model-errors.pipe';

// temp imported for prod build tests
import { ConfirmDialogComponent } from '@shared/components/helpers/confirm-dialog/confirm-dialog.component';

// services
import { CampaignService } from '@services/campaign.service';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ProgressSpinnerComponent,
    MainNavComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule.forRoot(),
    AuthenticationModule,
    CampaignCreatorModule,
    CampaignManagerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  entryComponents: [
    ProgressSpinnerComponent,
  ],
  providers: [
    CampaignService,
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}],
  bootstrap: [AppComponent],
})
export class AppModule {}

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }
