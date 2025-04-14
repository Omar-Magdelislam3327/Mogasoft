import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/loader/loader.component';
import { Meta } from '@angular/platform-browser';
import AOS from 'aos';
import { filter } from 'rxjs';
import { ScrollToTopComponent } from './shared/scroll-to-top/scroll-to-top.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , LoaderComponent , ScrollToTopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Mogasoft';
  constructor(private meta : Meta , private router : Router) {
    this.setMetaTags();
  }
  ngOnInit(): void {
    console.log = () => { }
    console.error = () => { };
    console.info = () => { };

    AOS.init({
      once: true,
      offset: 120,
      easing: 'ease-in-out',
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
  private setMetaTags(): void {
    this.meta.addTags([
      { name: 'description', content: 'We specialize in Web & Mobile Apps, Hosting, Digital Marketing, Computers, Surveillance Cameras, Copiers, Plotters, Networks, Firefighting, Alarms, and Queue Management.' },
      { name: 'keywords', content: 'Web Development, Mobile Apps, Hosting, Digital Marketing, Computers, Surveillance Cameras, Copiers, Networks, Fire Alarms, Queue Management' },
      { name: 'author', content: 'Mogasoft Integrated Solutions' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Mogasoft - Software & Hardware Solutions' },
      { property: 'og:description', content: 'Providing top-quality software and hardware solutions for businesses.' },
      { property: 'og:url', content: 'https://mogasoft.net/home' },
      { property: 'og:type', content: 'website' }
    ]);
  }
}
