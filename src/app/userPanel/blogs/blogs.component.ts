import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Meta, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { NormalHtmlPipe } from 'src/app/core/pipes/normal-html.pipe';
import { LangTransService } from 'src/app/core/services/lang-trans.service';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogsComponent {
  currentLang!: any;
  //
  blogs!: any;
  currentPage: number = 1;
  pageSize: number = 12;
  total: number = 0;
  fixed = Math.ceil(this.total / this.pageSize);
  showPagination: boolean = false;
  constructor(private api: BlogsService, private meta: Meta, private sanitizer: DomSanitizer, private lang: LangTransService, private cdr: ChangeDetectorRef) {
    window.scrollTo(0, 0);
    this.getBlogs();
  }
  ngOnInit(): void {
    //
    this.currentLang = localStorage.getItem('language') || 'en';
    this.lang.currentLang.subscribe((lang: string) => {
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
    this.api.getBlogs().subscribe((data: any) => {
      this.blogs = data.data;
      console.log(this.blogs);
      this.total = data.count;
      this.fixed = Math.ceil(this.total / this.pageSize);
      this.showPagination = this.total > this.pageSize;
      this.cdr.detectChanges();
    });
  }


  sanitizeHtml(blogDescription: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(blogDescription);
  }
  pageChanged(event: number): void {
    this.currentPage = event;
    this.getBlogs();
    window.scrollTo(0, 0);
  }
}
