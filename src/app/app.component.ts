import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'here';
  selectedSubscription = 'premium';

  onClickProceed() {
    alert(this.selectedSubscription);
  }
}
