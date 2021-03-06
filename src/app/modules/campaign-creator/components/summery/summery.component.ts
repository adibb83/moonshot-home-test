import { Component, OnInit, Input } from '@angular/core';
import { CampaignModel } from '@models/campaign.model';


@Component({
  selector: 'app-summery',
  templateUrl: './summery.component.html',
  styleUrls: ['./summery.component.scss']
})

export class SummeryComponent {
  @Input() data: CampaignModel;
  constructor() { }
}
