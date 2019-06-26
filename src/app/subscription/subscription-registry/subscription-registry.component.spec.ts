import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionRegistryComponent } from './subscription-registry.component';

describe('SubscriptionRegistryComponent', () => {
  let component: SubscriptionRegistryComponent;
  let fixture: ComponentFixture<SubscriptionRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionRegistryComponent ]
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
});
