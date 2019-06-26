import { Injectable } from '@angular/core';

@Injectable()
export class SubscriptionRegistryService {
    constructor() {}

    saveRegisteredIPs(values: any[]) {
        localStorage.setItem('RegisteredIP', values.toString());
    }
}