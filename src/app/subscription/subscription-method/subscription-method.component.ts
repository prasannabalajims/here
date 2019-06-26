import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SELECT_ITEM_HEIGHT_EM } from '@angular/material';
import { SubscriptionRangeEnum } from '../shared/subscription-range.enum';

@Component({
  selector: 'subscription-method',
  templateUrl: './subscription-method.component.html',
  styleUrls: ['./subscription-method.component.css']
})
export class SubscriptionMethodComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    
  }

  selectedSubscription = "basic";

  onClickProceed() {
    this._router.navigate(['/registry'], { queryParams: { subscriptionModel: this.selectedSubscription } });
  }
}
