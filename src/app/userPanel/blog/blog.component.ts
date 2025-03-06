import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { LangTransService } from 'src/app/core/services/lang-trans.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent {
  currentLang!: any;
  blog!: any;
  //
  facebookShareUrl: string = '';
  linkedinShareUrl: string = '';
  whatsappShareUrl: string = '';
  //
  slug!: string;

  constructor(private blogApi: BlogsService, private lang: LangTransService, private activ: ActivatedRoute, private cdr: ChangeDetectorRef) {
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
