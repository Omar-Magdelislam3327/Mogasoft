import { ChangeDetectorRef, Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { Blogs } from '../../core/models/Blogs';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../../core/services/blogs.service';
import { LangTransService } from '../../core/services/lang-trans.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    TranslateModule
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  blog!:Blogs | undefined;
  currentLang!:string;
  facebookShareUrl!:string;
  linkedinShareUrl!:string;
  whatsappShareUrl!:string;
  // 
  slug!: string;
  constructor(private blogApi: BlogsService, private lang: LangTransService, private activ: ActivatedRoute, private cdr: ChangeDetectorRef, private meta: Meta, private titleService: Title) {
    this.slug = this.activ.snapshot.params['slug'];
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    this.currentLang = localStorage.getItem('language') || 'en';
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
      this.getBlogBySlug();
    });
  }
  getBlogBySlug() {
    this.blogApi.getBlogBySlug(this.slug).subscribe(data => {
      this.blog = data;
      this.generateShareUrls();
      console.log("Blog Data:", data);

      if (this.blog) {
        const title = this.currentLang === 'ar' ? this.blog.titleAR : this.blog.titleEN;
        const description = this.currentLang === 'ar' ? this.blog.descriptionAR : this.blog.descriptionEN;
        const keywords = `${this.blog.titleEN}, ${this.blog.titleAR}, ${this.blog.descriptionEN}, ${this.blog.descriptionAR}`;
        console.log(title, description, keywords);
        this.meta.updateTag({ name: 'title', content: title });
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ name: 'keywords', content: keywords });
        this.titleService.setTitle(title);
      }

      this.cdr.detectChanges();
    });
  }

  generateShareUrls() {
    if (this.blog) {
      const blogUrl = encodeURIComponent(window.location.href);

      this.facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`;
      this.linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${blogUrl}`;
      this.whatsappShareUrl = `https://wa.me/?text=${blogUrl}`;
    }
  }
}
