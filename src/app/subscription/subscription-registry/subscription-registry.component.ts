import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subscription-registry',
  templateUrl: './subscription-registry.component.html',
  styleUrls: ['./subscription-registry.component.css']
})
export class SubscriptionRegistryComponent implements OnInit {

  constructor(private _router: ActivatedRoute) { }

  ngOnInit() {
    this._router.queryParams.subscribe(params => {
      alert(params);
    })
  }

}
