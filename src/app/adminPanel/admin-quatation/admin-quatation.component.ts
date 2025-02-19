import { Component } from '@angular/core';
import { QuatationsService } from 'src/app/core/services/quatations.service';

@Component({
  selector: 'app-admin-quatation',
  templateUrl: './admin-quatation.component.html',
  styleUrls: ['./admin-quatation.component.css']
})
export class AdminQuatationComponent {
  qutations: any;
  constructor(private quatationsService: QuatationsService) { }
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
