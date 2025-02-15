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
    { title: 'MobileDevelopment', image: '../../../assets/vendors/imgs/portfolioWeb.png' },
    { title: 'WebDevelopment', image: '../../../assets/vendors/imgs/portfolioWeb2.png' },
    { title: 'digitalMarketing', image: '../../../assets/vendors/imgs/portfolioWeb3.png' },
  ];

  hardwareItems = [
    { title: 'SurveliianceSystem', image: '../../../assets/vendors/imgs/portfolioWeb.png' },
    { title: 'Computers', image: '../../../assets/vendors/imgs/portfolioWeb.png' },
    { title: 'Copiers', image: '../../../assets/vendors/imgs/portfolioWeb.png' },
    { title: 'FireFighting', image: '../../../assets/vendors/imgs/portfolioWeb.png' },
    { title: 'QueueServcies', image: '../../../assets/vendors/imgs/portfolioWeb.png' },
    { title: 'Hardware Item 2', image: '../../../assets/vendors/imgs/portfolioWeb.png' },
    { title: 'Hardware Item 2', image: '../../../assets/vendors/imgs/portfolioWeb.png' },
    { title: 'Hardware Item 3', image: '../../../assets/vendors/imgs/portfolioWeb.png' }
  ];

  navigateToCategory(category: string) {
    this.router.navigate(['/projects', category]);
  }
}
