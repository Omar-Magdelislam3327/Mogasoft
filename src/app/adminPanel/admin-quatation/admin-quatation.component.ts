import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuotationsService } from '../../core/services/quotations.service';

@Component({
  selector: 'app-admin-quatation',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './admin-quatation.component.html',
  styleUrl: './admin-quatation.component.css'
})
export class AdminQuatationComponent {
  qutations: any;
  constructor(private quatationsService: QuotationsService) { }
  ngOnInit(): void {
    this.getQuatations();
  }
  getQuatations() {
    this.quatationsService.getQuotes().subscribe((res) => {
      this.qutations = res;
      console.log(res);
    })
  }
  removeQuotes(id: number) {
    this.quatationsService.deleteQuote(id).subscribe(() => {
      this.getQuatations();
    })
  }
}
