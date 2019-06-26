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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Remove sign must be disabled for the 1st input box', () => {
    const formElement = fixture.debugElement.query(By.css('#ip-input-form'));
    const inputElement = formElement.nativeElement.firstElementChild;
    expect(inputElement.children[1].classList.contains('disabled')).toBe(true);
  });

  it('Add sign must be enabled for the 1st input box only when there are no other input fields present', () => {
    const formElement = fixture.debugElement.query(By.css('#ip-input-form'));
    const inputElement = formElement.nativeElement.firstElementChild;
    expect(inputElement.children[2].classList.contains('disabled')).toBe(false);
    expect(formElement.children.length).toBe(1);
  });
});
