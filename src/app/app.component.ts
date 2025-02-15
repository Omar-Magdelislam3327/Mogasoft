import { Component } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mogasoft';
  ngOnInit() {
    AOS.init({
      once: true,
      easing: 'ease-in-out',
    });
  }
}
