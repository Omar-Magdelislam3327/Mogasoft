import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/loader/loader.component';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Mogasoft';
  constructor(private meta : Meta) {
    this.setMetaTags();
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
