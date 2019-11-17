import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CampaignsDataGridComponent} from './components/campaigns-data-grid/campaigns-data-grid.component';

const routes: Routes = [
  { path: '', component: CampaignsDataGridComponent},
  { path: 'campaigns-dataGrid', component: CampaignsDataGridComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignManagerRoutingModule { }
