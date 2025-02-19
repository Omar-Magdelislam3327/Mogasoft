import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { LangTransService } from 'src/app/core/services/lang-trans.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  id!: any;
  currentLang!: any;
  blog!: any;

  constructor(private blogApi: BlogsService, private lang: LangTransService, private activ: ActivatedRoute) {
    this.id = this.activ.snapshot.params['id'];
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    this.currentLang = localStorage.getItem('language') || 'en';
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
      this.getBlogById();
    });
  }
  getBlogById() {
    this.blogApi.getBlogById(this.id).subscribe(data => {
      this.blog = data;
      console.log(data);
    })
  }


}
