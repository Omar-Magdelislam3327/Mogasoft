import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  constructor(private router: Router) { }
  softwareOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  };

  hardwareOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  };

  softwareItems = [
    { userTitle: "Web Development", title: 'WebDevelopment', image: '../../../assets/vendors/imgs/portfolioWeb2.png' },
    { userTitle: "Mobile Development", title: 'MobileDevelopment', image: '../../../assets/vendors/imgs/portfolioWeb.png' },
    { userTitle: "Digital Marketing", title: 'DigitalMarketing', image: '../../../assets/vendors/imgs/portfolioWeb3.png' },
  ];

  hardwareItems = [
    { userTitle: "Computers", title: 'Computers', image: '../../../assets/vendors/imgs/portfolioWeb.png' },
    { userTitle: "Surveliiance System", title: 'SurveillanceSystems', image: '../../../assets/vendors/imgs/portfolioWeb.png' },
    { userTitle: "Copiers", title: 'Copiers', image: '../../../assets/vendors/imgs/portfolioWeb.png' },
    { userTitle: "Fire Fighting", title: 'FireFighting', image: '../../../assets/vendors/imgs/portfolioWeb.png' },
    { userTitle: "Network", title: 'Network', image: '../../../assets/vendors/imgs/portfolioWeb.png' },
    { userTitle: "Queue Management", title: 'QueueManagement', image: '../../../assets/vendors/imgs/portfolioWeb.png' },
  ];

  navigateToCategory(category: string) {
    this.router.navigate(['/projects', category]);
  }
}
