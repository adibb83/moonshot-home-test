import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CampaignManagerRoutingModule } from './campaign-manager-routing.module';
import { CampaignsDataGridComponent } from './components/campaigns-data-grid/campaigns-data-grid.component';
import { MatIconModule, MatInputModule, MatButtonModule } from '@angular/material';
import { SheardModule } from '@modules/sheard/sheard.module';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '@services/auth-guard.service';
import { AuthTokenService } from '@services/auth-token.service';

@NgModule({
  declarations: [CampaignsDataGridComponent],
  imports: [
    CommonModule,
    CampaignManagerRoutingModule,
    FormsModule,
    SheardModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [AuthTokenService , AuthGuard]
})
export class CampaignManagerModule { }
