import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LangTransService } from 'src/app/core/services/lang-trans.service';
import { ProjectsService } from 'src/app/core/services/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  id!: number;
  project!: any;
  mediaUrls: string[] = [];
  projectSteps: any[] = [];
  currentLang!: any
  constructor(private projectApi: ProjectsService, private lang: LangTransService, private activ: ActivatedRoute) { }
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
    this.activ.params.subscribe(params => {
      this.id = +params['id'];
      this.getProject(this.id);
    });
  }
  getProject(id: number) {
    this.projectApi.getProjectById(id).subscribe((res: any) => {
      this.project = res;
      if (res && res.mediaUrls) {
        this.mediaUrls = res.mediaUrls;
      }
      if (res && res.projectSteps) {
        this.projectSteps = res.projectSteps;
      }
      console.log(this.project);
    });
  }
}
