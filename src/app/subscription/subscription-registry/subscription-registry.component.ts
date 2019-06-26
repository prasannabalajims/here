import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionRangeEnum } from './subscription-range.enum';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-subscription-registry',
  templateUrl: './subscription-registry.component.html',
  styleUrls: ['./subscription-registry.component.css']
})
export class SubscriptionRegistryComponent implements OnInit {

  public formGroup: FormGroup;
  ipLimits: any;
  formControlCounter = 1;

  constructor(private _router: ActivatedRoute) { }

  ngOnInit() {
    this.initFormGroup();
    this._router.queryParams.subscribe(params => {
      this.ipLimits = SubscriptionRangeEnum[params['subscriptionModel']];
    });
  }

  initFormGroup() {
    this.formGroup = new FormGroup({
      'input-0': new FormControl()
    });
  }

  /**
   * Handler for + button
   * This API aims at adding new input field to the form
   */
  onAddBtnClick() {
    if (Object.keys(this.formGroup.controls).length < this.ipLimits) {
      this.formGroup.addControl('input-' + this.formControlCounter, new FormControl());
      ++this.formControlCounter;
    }
  }

  /**
   * Handler for - button
   * This API aims at removing the specific field from the form 
   * 
   * @param controlKey FormControl name which has to be removed from the form
   */
  onRemoveBtnClick(controlKey) {
    this.formGroup.removeControl(controlKey);
  }

  /**
   * API to be invoked on click of Save action
   * This will update the localStorage with valid user entered values
   */
  onClickSave() {
    let values = [];
    for (let control of Object.keys(this.formGroup.controls)) {
      values.push(this.formGroup.controls[control]['value']);
    }
    localStorage.setItem('RegisteredIPs', values.toString());
  }

  isRemoveDisabled(controlKey) {
    const controls = Object.keys(this.formGroup.controls);
    let index = controls.findIndex(control => control === controlKey);
    return index == 0 ? true : false;
  }

  isAddDisabled(controlKey) {
    const controls = Object.keys(this.formGroup.controls);
    let index = controls.findIndex(control => control === controlKey);
    return index == this.ipLimits - 1 ? true : false;    
  }
}
