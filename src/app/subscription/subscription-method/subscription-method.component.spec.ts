import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionMethodComponent } from './subscription-method.component';

describe('SubscriptionMethodComponent', () => {
  let component: SubscriptionMethodComponent;
  let fixture: ComponentFixture<SubscriptionMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
