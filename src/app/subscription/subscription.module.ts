import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionMethodComponent } from './subscription-method/subscription-method.component';
import { MatSelectModule } from '@angular/material';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionRegistryComponent } from './subscription-registry/subscription-registry.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SubscriptionRegistryService } from './subscription-registry/subscription-registry.service';

@NgModule({
  declarations: [SubscriptionMethodComponent, SubscriptionRegistryComponent],
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    SubscriptionRoutingModule
  ],
  providers: [SubscriptionRegistryService]
})
export class SubscriptionModule { }
