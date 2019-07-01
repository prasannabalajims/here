import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionRegistryComponent } from './subscription-registry.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { SubscriptionRegistryService } from './subscription-registry.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('SubscriptionRegistryComponent', () => {
  let component: SubscriptionRegistryComponent;
  let fixture: ComponentFixture<SubscriptionRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionRegistryComponent],
      imports: [
        BrowserAnimationsModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        CommonModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            queryParams: {
              subscribe: (fn: (value: Params) => void) => fn({
                subscriptionModel: 'basic'
              }),
            }
          }
        },
        SubscriptionRegistryService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Remove sign must be disabled for the 1st input box when there is no value', () => {
    const formElement = fixture.debugElement.query(By.css('#ip-input-form'));
    const inputElement = formElement.nativeElement.firstElementChild;
    expect(inputElement.children[1].classList.contains('disabled')).toBeTruthy();
  });

  it('Add sign must be enabled for the 1st input box only when there are no other input fields present', () => {
    const formElement = fixture.debugElement.query(By.css('#ip-input-form'));
    const inputElement = formElement.nativeElement.firstElementChild;
    expect(inputElement.children[2].classList.contains('disabled')).toBeFalsy();
    expect(formElement.children.length).toBe(1);
  });

  it('Add maximum allowed inputs and verify if the last input has add disabled and remove is enabled for all inputs except the first', () => {
    fixture.componentInstance.ipLimits = 5
    for(let i=0; i<5; i++) {
      fixture.componentInstance.onAddBtnClick();
    }
    fixture.detectChanges();
    
    const formElement = fixture.debugElement.query(By.css('#ip-input-form')).nativeElement;
    expect(formElement.children.length).toBe(5);
    
    const inputElement = formElement.children[4];
    expect(inputElement.children[2].classList.contains('disabled')).toBeTruthy();

    expect(formElement.children[0].children[1].classList.contains('disabled')).toBeTruthy();
    for(let i=1; i<formElement.children.length; i++) {
      expect(formElement.children[i].children[1].classList.contains('disabled')).toBeFalsy();
    }    
  });

  it('Remove icon should remove the input field from the UI', () => {
    fixture.componentInstance.onAddBtnClick();
    fixture.componentInstance.onAddBtnClick();
    fixture.detectChanges();
    
    fixture.componentInstance.onRemoveBtnClick("input-2");
    fixture.detectChanges();

    const formElement = fixture.debugElement.query(By.css('#ip-input-form')).nativeElement;
    expect(formElement.children.length).toBe(2);
  });

  it('Save Button should be disabled if there are no values present in any inputs', () => {
    fixture.componentInstance.onAddBtnClick();
    fixture.componentInstance.onAddBtnClick();
    fixture.detectChanges();
    
    const saveBtn = fixture.debugElement.query(By.css('#save-btn')).nativeElement;
    expect(saveBtn.disabled).toBeTruthy();
  });

  it('Save Button should be enabled if there is atleast one valid input', () => {
    fixture.componentInstance.onAddBtnClick();
    fixture.componentInstance.onAddBtnClick();
    fixture.componentInstance.formGroup.controls['input-2'].setValue("255.12.11.21"); 
    fixture.detectChanges();
    
    const saveBtn = fixture.debugElement.query(By.css('#save-btn')).nativeElement;
    expect(saveBtn.disabled).toBeFalsy();
  });

  it('Save Button should be disabled if there is no valid input in any of the fields', () => {
    fixture.componentInstance.onAddBtnClick();
    fixture.componentInstance.onAddBtnClick();
    fixture.componentInstance.formGroup.controls['input-2'].setValue("Entering IP"); 
    fixture.detectChanges();
    
    const saveBtn = fixture.debugElement.query(By.css('#save-btn')).nativeElement;
    expect(saveBtn.disabled).toBeTruthy();
  });

  it('Remove button should be enabled for first input box when there are values present and the remove action should clear values in the input', () => {
    fixture.componentInstance.formGroup.controls['input-0'].setValue("255.1.1.1");
    fixture.detectChanges();

    const formElement = fixture.debugElement.query(By.css('#ip-input-form')).nativeElement;
    const inputElement = formElement.children[0];
    expect(inputElement.children[1].classList.contains('disabled')).toBeFalsy();

    fixture.componentInstance.onRemoveBtnClick('input-0');
    fixture.detectChanges();

    expect(fixture.componentInstance.formGroup.controls['input-0'].value).toBe("");
    expect(inputElement.children[1].classList.contains('disabled')).toBeTruthy();
  });

  it('Save button should be enabled when there is only one input and the input box is dirty/touched', () => {
    const saveBtn = fixture.debugElement.query(By.css('#save-btn')).nativeElement;
    expect(saveBtn.disabled).toBeTruthy();

    fixture.componentInstance.formGroup.controls['input-0'].setValue("255.1.1.1");
    fixture.detectChanges();
    expect(saveBtn.disabled).toBeFalsy();
    
    fixture.componentInstance.formGroup.controls['input-0'].setValue("");
    fixture.componentInstance.formGroup.controls['input-0'].markAsDirty();
    fixture.detectChanges();
    expect(saveBtn.disabled).toBeFalsy();

    fixture.componentInstance.onAddBtnClick();
    fixture.detectChanges();
    expect(saveBtn.disabled).toBeTruthy();
  });
});
