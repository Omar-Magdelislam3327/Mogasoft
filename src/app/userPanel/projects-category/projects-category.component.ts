import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LangTransService } from '../../core/services/lang-trans.service';
import { ProjectsService } from '../../core/services/projects.service';

@Component({
  selector: 'app-projects-category',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    TranslateModule,
    RouterLink
  ],
  templateUrl: './projects-category.component.html',
  styleUrl: './projects-category.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsCategoryComponent {
  category: string | null = null;
  projects: any;
  currentLang!: any;
  userCategory!: any;
  constructor(private route: ActivatedRoute, private ProjectApi: ProjectsService, private lang: LangTransService, private cdr: ChangeDetectorRef) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    this.currentLang = localStorage.getItem('language') || 'en';
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
    });
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
      if (this.category) {
        this.fetchProjects();
      }
    });
  }

  fetchProjects() {
    this.ProjectApi.getProjectsByCategory(this.category).subscribe(
      (data: any) => {
        this.projects = data;
        this.userCategory = this.projects[0].category;
        this.cdr.detectChanges();
        console.log(this.projects);
        console.log(this.userCategory);
      },
      (error) => {
        console.error('Error:', error);
      }
    )
  }
}
