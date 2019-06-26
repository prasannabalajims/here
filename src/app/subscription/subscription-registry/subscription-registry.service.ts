import { Injectable } from '@angular/core';

@Injectable()
export class SubscriptionRegistryService {
    constructor() {}

    saveRegisteredIPs(registeredIPs: string) {
        localStorage.setItem('RegisteredIP', registeredIPs);
    }
}