import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionMethodComponent } from './subscription-method/subscription-method.component';
import { MatSelectModule } from '@angular/material';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionRegistryComponent } from './subscription-registry/subscription-registry.component';

@NgModule({
  declarations: [SubscriptionMethodComponent, SubscriptionRegistryComponent],
  imports: [
    MatSelectModule,
    CommonModule,
    SubscriptionRoutingModule
  ]
})
export class SubscriptionModule { }
