import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoreModule } from '@modules/core/core.module';
import { AuthenticationModule } from '@modules/Authentication/authentication.module';

import { ProgressSpinnerComponent} from '@shared/components/helpers/progress-spinner/progress-spinner.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { MainNavComponent } from '@shared/components/main-nav/main-nav.component';
// pipes
import { SafePipe } from './pipes/safe-html.pipe';
import {ExtractModelErrorsPipe } from './pipes/extract-model-errors.pipe';
// temp imported for prod build tests
import {ConfirmDialogComponent} from '@shared/components/helpers/confirm-dialog/confirm-dialog.component';
import {ErrorPanelComponent} from '@shared/components/helpers/error-panel/error-panel.component';
import { SuccessPanelComponent} from '@shared/components/helpers/success-panel/success-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ProgressSpinnerComponent,
    MainNavComponent,
    ConfirmDialogComponent,
    ErrorPanelComponent,
    SuccessPanelComponent,
    SafePipe,
    ExtractModelErrorsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule.forRoot(),
    AuthenticationModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  entryComponents: [
    ProgressSpinnerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }
