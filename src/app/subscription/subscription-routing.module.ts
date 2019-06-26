import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionMethodComponent } from './subscription-method/subscription-method.component';
import { SubscriptionRegistryComponent } from './subscription-registry/subscription-registry.component';

const subscriptionRoutes: Routes = [
    {
        path: 'subscription',
        component: SubscriptionMethodComponent
    },
    {
        path: 'registry',
        component: SubscriptionRegistryComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(subscriptionRoutes)],
    exports: [RouterModule]
})
export class SubscriptionRoutingModule {

}
