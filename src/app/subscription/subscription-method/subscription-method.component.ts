import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SELECT_ITEM_HEIGHT_EM } from '@angular/material';

@Component({
  selector: 'subscription-method',
  templateUrl: './subscription-method.component.html',
  styleUrls: ['./subscription-method.component.css']
})
export class SubscriptionMethodComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  selectedSubscription = 'premium';

  onClickProceed() {
    this._router.navigate(['/registry'], { queryParams: { subscriptionMethod: this.selectedSubscription } });
  }
}
