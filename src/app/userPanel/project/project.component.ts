import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LangTransService } from 'src/app/core/services/lang-trans.service';
import { ProjectsService } from 'src/app/core/services/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ProjectComponent {
  id!: number;
  project!: any;
  mediaUrls: string[] = [];
  projectSteps: any[] = [];
  currentLang!: any;
  direction!: any;
  //
  slug!: string;
  constructor(private projectApi: ProjectsService, private lang: LangTransService, private activ: ActivatedRoute, private cdr: ChangeDetectorRef, private meta: Meta, private titleService: Title) {
    window.scrollTo(0, 0);
    this.direction = this.lang.currentLang === 'ar' ? 'rtl' : 'ltr';
    this.slug = this.activ.snapshot.params['slug'];
    console.log("slug:", this.slug);
  }
  carouselOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 }
    }
  };
  ngOnInit(): void {
    this.currentLang = localStorage.getItem('language') || 'en';
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
    });
    this.getProject();
  }
  getProject() {
    this.projectApi.getProjectBySlug(this.slug).subscribe((res: any) => {
      this.project = res;
      if (res && res.mediaUrls) {
        this.mediaUrls = res.mediaUrls;
      }
      if (res && res.projectSteps) {
        this.projectSteps = res.projectSteps;
      }
      if (this.project) {
        const title = this.currentLang === 'ar' ? this.project.titleAR : this.project.titleEN;
        const description = this.currentLang === 'ar' ? this.project.descriptionAR : this.project.descriptionEN;
        const keywords = `${this.project.titleEN}, ${this.project.titleAR}, ${this.project.descriptionEN}, ${this.project.descriptionAR}`;

        this.meta.updateTag({ name: 'title', content: title });
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ name: 'keywords', content: keywords });
        console.log(keywords)
        this.titleService.setTitle(title);
      }
      this.cdr.detectChanges();
      console.log(this.project);
    });
  }
}
