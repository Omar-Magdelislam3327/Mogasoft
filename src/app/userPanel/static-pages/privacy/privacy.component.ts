import { Component } from '@angular/core';
import { FooterComponent } from "../../../shared/footer/footer.component";
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [FooterComponent, NavbarComponent , TranslateModule],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
export class PrivacyComponent {

}
