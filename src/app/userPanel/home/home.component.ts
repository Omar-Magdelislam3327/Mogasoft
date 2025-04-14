import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ClientsService } from '../../core/services/clients.service';
import { ProjectsService } from '../../core/services/projects.service';
import { Projects } from '../../core/models/Projects';
import { Clients } from '../../core/models/clients';
import { BlogsService } from '../../core/services/blogs.service';
import { Blogs } from '../../core/models/Blogs';
import { ReviewsService } from '../../core/services/reviews.service';
import { Reviews } from '../../core/models/Reviews';
import { forkJoin } from 'rxjs';
import { LangTransService } from '../../core/services/lang-trans.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    TranslateModule,
    CommonModule,
    RouterLink,
    CarouselModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  direction!: string;
  currentLang: string;
  // 
  clientsOptions!:OwlOptions;
  toolsOptions!:OwlOptions;
  projectsOptions!:OwlOptions;
  // 
  clients: Clients[] = [];
  projects: Projects[] = [];
  blogs: Blogs[] = [];
  reviews: Reviews[] = [];
  // 
  tools = Array.from({ length: 19 }, (_, i) => ({
    image: `assets/vendors/imgs/tools/Tool Icon (${i + 1}).png`
  }));
  // 
  constructor(private translate: TranslateService , private clientAPI : ClientsService , private projectAPI : ProjectsService , private blogApi : BlogsService , private reviewsAPI : ReviewsService , private lang : LangTransService){
    this.currentLang = localStorage.getItem('language') || 'en';
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
      this.direction = this.translate.currentLang === 'ar' ? 'rtl' : 'ltr';
    });
  }
  ngOnInit(): void {
    this.clientsOptions = {
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
      rtl: this.currentLang === 'ar',
      responsive: {
        0: { items: 1 },
        600: { items: 3 },
        1000: { items: 5 }
      }
    };
    this.toolsOptions={
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
      rtl: this.currentLang === 'ar',
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
    this.projectsOptions = {
      loop: true,
      margin: 10,
      dots: true,
      autoplay: false,
      rtl: this.currentLang === 'ar',
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 }
      }
    };
    this.translate.onLangChange.subscribe(() => {
      this.direction = this.translate.currentLang === 'ar' ? 'rtl' : 'ltr';
      this.clientsOptions.rtl = this.translate.currentLang === 'ar';
    });
    this.loadData();
  }
  private loadData(): void {
    forkJoin({
      clients: this.clientAPI.getClients(),
      projects: this.projectAPI.getProjects(),
      blogs: this.blogApi.getBlogs(),
      reviews: this.reviewsAPI.getReviews()
    }).subscribe({
      next: ({ clients, projects, blogs, reviews }) => {
        this.clients = clients;
        this.projects = projects;
        this.blogs = blogs.data?.slice(0, 3) || [];
        this.reviews = reviews.slice(0, 4);
      },
      error: (err: any) => {
        console.error('Error:', err);
      }
    });
  }
  // 
  getStars(stars: number): string {
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  }
  // =============================================== TrackBy ===============================================
  trackByProjectId(index: number, project: Projects): number {
    return project.id;
  }
  
  trackByBlogId(index: number, blog: Blogs): number {
    return blog.id;
  }
  
  trackByClientId(index: number, client: Clients): number {
    return client.id;
  }
  
  trackByReviewId(index: number, review: Reviews): number {
    return review.id;
  }  
}
