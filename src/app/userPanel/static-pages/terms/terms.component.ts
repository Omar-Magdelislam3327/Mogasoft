import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, TranslateModule , NavbarComponent , FooterComponent ],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.css'
})
export class TermsComponent {
  sectionKeys = [
    'ACCOUNT_ELIGIBILITY',
    'ACCOUNT_SECURITY',
    'TRANSFER_TO_COMPANY',
    'DOMAINS',
    'RESELLER_HOSTING',
    'VPS',
    'SHARED_CLOUD_HOSTING',
    'DEDICATED_SERVERS',
    'BACKUPS',
    'BILLING_REFUNDS',
    'PROHIBITED_CONTENT',
    'TERMINATION'
  ];
}
