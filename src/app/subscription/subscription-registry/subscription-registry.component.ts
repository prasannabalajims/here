import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionRangeEnum } from '../shared/subscription-range.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IpPatternValidator } from '../shared/ip-pattern.validator';
import { SubscriptionRegistryService } from './subscription-registry.service';

@Component({
  selector: 'app-subscription-registry',
  templateUrl: './subscription-registry.component.html',
  styleUrls: ['./subscription-registry.component.css']
})
export class SubscriptionRegistryComponent implements OnInit {

  public formGroup: FormGroup;
  formControlCounter: any;

  ipLimits: any;
  ipRegexPattern: RegExp = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
  isSaveBtnDisabled: boolean = true;

  constructor(private _router: ActivatedRoute,
    private _registryService: SubscriptionRegistryService) { }

  ngOnInit() {
    this._router.queryParams.subscribe(params => {
      this.ipLimits = SubscriptionRangeEnum[params['subscriptionModel']];
    });
    this.initFormGroup();
  }

  initFormGroup() {
    this.formGroup = new FormGroup({
      'input-0': new FormControl("", [Validators.required, IpPatternValidator(this.ipRegexPattern)])
    });
    this.formGroup.valueChanges.subscribe(value => {
      this.toggleSaveBtn();
    });
    this.formControlCounter = 1;
  }

  /**
   * Handler for + button
   * This API aims at adding new input field to the form
   */
  onAddBtnClick() {
    if (Object.keys(this.formGroup.controls).length < this.ipLimits) {
      this.formGroup.addControl('input-' + this.formControlCounter, new FormControl("", [Validators.required, IpPatternValidator(this.ipRegexPattern)]));
      ++this.formControlCounter;
      this.toggleSaveBtn();
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
    this.toggleSaveBtn();
  }

  /**
   * API to be invoked on click of Save action
   * This will update the localStorage with valid user entered values
   */
  onClickSave() {
    const values = Object.values(this.formGroup.controls)
      .map(control => control.value)
      .filter(element => { return element != "" });
    const registeredIPs = values.join(",");

    this._registryService.saveRegisteredIPs(registeredIPs);
    this.isSaveBtnDisabled = true;
  }

  isRemoveDisabled(controlKey) {
    const controls = Object.keys(this.formGroup.controls);
    let index = controls.findIndex(control => control === controlKey);
    return index == 0 ? true : false;
  }

  isAddDisabled(controlKey) {
    const controls = Object.keys(this.formGroup.controls);
    let index = controls.findIndex(control => control === controlKey);

    //Ensuring only the last input field will have the add button and 
    //the same will be disabled if the input reaches the threshold limit
    if(index == controls.length - 1 && index != this.ipLimits - 1) {
      return false;
    } 
    return true;
  }

  isSaveDisabled() {
    if(this.formGroup.valid) {
      return false;
    }
    
    const controlsMap = Object.values(this.formGroup.controls).map(control => {
      return {
        value: control.value,
        invalid: control.invalid
      }
    });

    //Finding the count of Form fields with value as empty
    const emptyValuesCount = controlsMap.filter(elements => { 
      return elements.value == "" 
    }).length;

    //Finding the count of Form fields with value which is invalid
    const invalidCount = controlsMap.filter(element => { 
      return element.value != "" && element.invalid 
    }).length;

    if(emptyValuesCount == Object.keys(this.formGroup.controls).length || invalidCount > 0) {
      return true;
    }
   
    return false;
  }

  toggleSaveBtn() {
    if (this.isSaveBtnDisabled) {
      this.isSaveBtnDisabled = false;
    }
  }

  isDisplayValidationMsg(controlKey) {
    const control = this.formGroup.controls[controlKey];
    if (control.value.length != 0) {
      if (control.invalid && (control.dirty || control.touched)) {
        return true;
      }
    }
    return false;
  }
}
