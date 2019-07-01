import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionRangeEnum } from '../shared/subscription-range.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IpPatternValidator } from '../shared/ip-pattern.validator';
import { SubscriptionRegistryService } from './subscription-registry.service';
import { element } from 'protractor';
import { CommonUtil } from '../shared/common.util';

/**
 * ControlName will follow the Pattern of input-0, input-1, input-2,etc
 * 
 * Hence CONTROL_NAME will act as base pattern and counter will be
 * appended on iteration
 */
const CONTROL_NAME = 'input-';

@Component({
  selector: 'app-subscription-registry',
  templateUrl: './subscription-registry.component.html'
})
export class SubscriptionRegistryComponent implements OnInit {

  public formGroup: FormGroup;
  formControlCounter: any = 0;

  ipLimits: any;
  ipRegexPattern: RegExp = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
  isSaveBtnDisabledOnSave: boolean = true;

  constructor(private _router: ActivatedRoute,
    private _registryService: SubscriptionRegistryService) { }

  ngOnInit() {
    this._router.queryParams.subscribe(params => {
      this.ipLimits = SubscriptionRangeEnum[params['subscriptionModel']];
    });
    this.initFormGroup();
  }

  initFormGroup() {
    const key = CONTROL_NAME.concat(this.formControlCounter);
    this.formGroup = new FormGroup({
      [key]: new FormControl("", [Validators.required, IpPatternValidator(this.ipRegexPattern)])
    });
    ++this.formControlCounter;

    // Custom displayError attribute in the FormControl decides on displaying the validation message on the UI for each input
    this.formGroup.controls[key]['displayError'] = false;
    this.formGroup.valueChanges.subscribe(value => {
      this.toggleSaveBtn();
    });
  }

  /**
   * Handler for + button
   * This API aims at adding new input field to the form
   */
  onAddBtnClick() {
    if (Object.keys(this.formGroup.controls).length < this.ipLimits) {
      const key = CONTROL_NAME.concat(this.formControlCounter);
      this.formGroup.addControl(key, new FormControl("", [Validators.required, IpPatternValidator(this.ipRegexPattern)]));
      this.formGroup.controls[key]['displayError'] = false;
      ++this.formControlCounter;
      this.toggleSaveBtn();
    }
  }

  /**
   * Handler for - button
   * This API aims at removing the specific field from the form and clears the 
   * content of the field in case of first input element
   * 
   * @param controlKey FormControl name which has to be removed from the form
   */
  onRemoveBtnClick(controlKey) {
    if (controlKey === CONTROL_NAME.concat('0')) {
      this.formGroup.controls[controlKey].setValue("");
      this.validateInputOnChange(controlKey);
    } else {
      this.formGroup.removeControl(controlKey);
    }
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
    this.isSaveBtnDisabledOnSave = true;
  }

  isRemoveDisabled(controlKey) {
    const controls = Object.keys(this.formGroup.controls);
    let index = controls.findIndex(control => control === controlKey);
    if (index == 0) {
      //Condition ensuring if the first input has value, then the remove will not be disabled
      //In such case, remove button will be used to clear the contents in the input field
      const value = this.formGroup.controls[controlKey].value;
      if (!value || (value && value.length == 0)) {
        return true;
      }
    }
    return false;
  }

  isAddDisabled(controlKey) {
    const controls = Object.keys(this.formGroup.controls);
    let index = controls.findIndex(control => control === controlKey);

    //Ensuring only the last input field will have the add button and 
    //the same will be disabled if the input reaches the threshold limit
    if (index == controls.length - 1 && index != this.ipLimits - 1) {
      return false;
    }
    return true;
  }

  isSaveDisabled() {
    //Save must be enabled when all the form controls have valid inputs
    if (this.formGroup.valid) {
      return false;
    }

    // Save must be enabled when the form has only one input and the input's
    // value is cleared using remove button.
    // This condition ensures to provide provision to the user to clear all the
    // IP address saved before.
    if (Object.keys(this.formGroup.controls).length == 1) {
      const control = Object.values(this.formGroup.controls)[0];
      if (CommonUtil.isEmptyString(control.value) && (control.dirty || control.touched)) {
        return false;
      }
    }

    const controlsMap = Object.values(this.formGroup.controls).map(control => {
      return {
        value: control.value,
        invalid: control.invalid
      }
    });

    //Finding the count of Form fields with value as empty
    const emptyValuesCount = controlsMap.filter(element => {
      return CommonUtil.isEmptyString(element.value)
    }).length;

    //Finding the count of Form fields with value which is invalid
    const invalidCount = controlsMap.filter(element => {
      return element.value != "" && element.invalid
    }).length;

    if (emptyValuesCount == Object.keys(this.formGroup.controls).length || invalidCount > 0) {
      return true;
    }

    return false;
  }

  toggleSaveBtn() {
    if (this.isSaveBtnDisabledOnSave) {
      this.isSaveBtnDisabledOnSave = false;
    }
  }

  /**
   * API to be invoked onChange of inputs to display the validation messages
   * wherever required
   * 
   * @param controlKey FormControl name which the input has to be validated
   */
  validateInputOnChange(controlKey) {
    const control = this.formGroup.controls[controlKey];
    if (control.value && control.value.length != 0 && control.invalid && (control.dirty || control.touched)) {
      this.formGroup.controls[controlKey]['displayError'] = true;
    } else {
      this.formGroup.controls[controlKey]['displayError'] = false;
    }
  }
}
