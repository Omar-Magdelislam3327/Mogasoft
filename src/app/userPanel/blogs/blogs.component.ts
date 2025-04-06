import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Blogs } from '../../core/models/Blogs';
import { NgxPaginationModule } from 'ngx-pagination';
import { Meta, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogsService } from '../../core/services/blogs.service';
import { LangTransService } from '../../core/services/lang-trans.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    TranslateModule,
    CommonModule,
    RouterLink,
    NgxPaginationModule
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit , OnDestroy {
  currentLang: string = 'en';
  blogs!: any;
  currentPage: number = 1;
  pageSize: number = 12;
  total: number = 0;
  fixed = Math.ceil(this.total / this.pageSize);
  showPagination: boolean = false;
  // 
  private langSubscription!: Subscription; // To manage subscription cleanup
  constructor(private api: BlogsService, private meta: Meta, private sanitizer: DomSanitizer, private lang: LangTransService, private cdr: ChangeDetectorRef) {
    window.scrollTo(0, 0);
  }
  ngOnInit(): void {
    //
    this.currentLang = this.lang.getLanguage();
        this.langSubscription = this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
      this.getBlogs();
    });
    //
    this.meta.addTags([
      { name: 'description', content: 'Explore expert insights and articles on the latest trends in web and mobile development at Mogasoft.' },
      { name: 'keywords', content: 'Mogasoft blog, web development blog, mobile development articles, technology insights ,' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }
  getBlogs(): void {
    this.api.getBlogs().subscribe({
      next:(data:any)=>{
      this.blogs = data.data;
      console.log(this.blogs);
      this.total = data.count;
      this.fixed = Math.ceil(this.total / this.pageSize);
      this.showPagination = this.total > this.pageSize;
      const keywords = this.blogs
        .map((blog: any) =>
          `${blog.titleEN}, ${blog.descriptionEN}, ${blog.titleAR}, ${blog.descriptionAR}`
        )
        .join(', ');

      this.meta.updateTag({ name: 'keywords', content: keywords });

      this.cdr.detectChanges();
      },error:(err:any)=>{
        console.log(err);
      }
    })
  }

  sanitizeHtml(blogDescription: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(blogDescription);
  }
  pageChanged(event: number): void {
    this.currentPage = event;
    this.getBlogs();
    window.scrollTo(0, 0);
  }
  trackByBlogId(index: number, blog: Blogs): number {
    return blog.blogId;
  }
  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
}
