import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { ClientsService } from 'src/app/core/services/clients.service';
import { LangTransService } from 'src/app/core/services/lang-trans.service';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { ReviewsService } from 'src/app/core/services/reviews.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  direction!: any;
  currentLang!: any;
  Projects: any;
  blogs!: any;
  clients!: any;
  reviews!: any;
  constructor(private titleService: Title, private metaService: Meta, private lang: LangTransService, private projectAPI: ProjectsService, private blogAPI: BlogsService, private clientAPI: ClientsService, private reviewsAPI: ReviewsService, private cdr: ChangeDetectorRef) {
    window.scrollTo(0, 0);
    this.direction = this.lang.currentLang === 'ar' ? 'rtl' : 'ltr';
    this.currentLang = localStorage.getItem('language') || 'en'
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
    });
    this.getProjects();
    this.getBlogs();
    this.getClients();
    this.getReviews();
  }
  ngOnInit(): void {
    this.titleService.setTitle('Mogasoft | Home');
    this.metaService.addTags([
      { name: 'description', content: 'We specialize in Web & Mobile Apps, Hosting, Digital Marketing, Computers, Surveillance Cameras, Copiers, Plotters, Networks, Firefighting, Alarms, and Queue Management.' },
      { name: 'keywords', content: 'Mogasoft, Software Solutions, Hardware Solutions, Web Development, AI, security , Cybersecurity , mobile' },
      { name: 'author', content: 'Mogasoft Integrated Solutions' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Mogasoft | Home' },
      { property: 'og:description', content: 'Empowering businesses with cutting-edge software and hardware solutions.' },
      { property: 'og:url', content: 'https://mogasoft.net/home' },
    ])
  }

  tools = [
    { image: "assets/vendors/imgs/tools/Tool Icon.png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (1).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (2).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (3).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (4).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (5).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (6).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (7).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (8).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (9).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (11).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (12).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (13).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (14).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (15).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (16).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (17).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (18).png" },
    { image: "assets/vendors/imgs/tools/Tool Icon (19).png" }
  ];
  clientsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayHoverPause: false,
    autoplayTimeout: 1500,
    smartSpeed: 800,
    nav: false,
    rtl: this.lang.currentLang === 'ar',
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    },
  };
  toolsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayHoverPause: false,
    autoplayTimeout: 1500,
    smartSpeed: 800,
    responsive: {
      0: {
        items: 3
      },
      600: {
        items: 7
      },
      1000: {
        items: 11
      }
    },
    nav: false
  };
  customOptions = {
    loop: true,
    margin: 10,
    dots: true,
    autoplay: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  };
  //================================================================================
  getProjects() {
    this.projectAPI.getProjects().subscribe((res: any) => {
      this.Projects = res;
      console.log(res);
      this.cdr.detectChanges();
    });
  }

  getBlogs() {
    this.blogAPI.getBlogs().subscribe((res: any) => {
      this.blogs = res.data.slice(0, 3);
      console.log(res);
    });
  }
  getClients() {
    this.clientAPI.getClients().subscribe((res: any) => {
      this.clients = res;
    });
  }
  getReviews() {
    this.reviewsAPI.getReviews().subscribe((res: any) => {
      this.reviews = res.slice(0, 4)
      console.log(res);
    });
  }
  getStars(stars: number): string {
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  }
}
