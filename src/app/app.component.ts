import { Component, HostListener } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mogasoft';
  constructor(private meta: Meta) { }
  ngOnInit() {
    // console.log = () => { }
    console.error = () => { }
    console.info = () => { }
    AOS.init({
      once: true,
      easing: 'ease-in-out',
    });
  }

  // @HostListener('document:contextmenu', ['$event'])
  // disableRightClick(event: MouseEvent): void {
  //   event.preventDefault();
  // }
  // @HostListener('document:keydown', ['$event'])
  // disableKeyboardShortcuts(event: KeyboardEvent): void {
  //   const forbiddenKeys = ['F12', 'I', 'J', 'U', "C"];

  //   if (event.key === 'F12') {
  //     event.preventDefault();
  //   }

  //   if (event.ctrlKey && event.shiftKey && forbiddenKeys.includes(event.key)) {
  //     event.preventDefault();
  //   }
  //   if (event.ctrlKey && event.key === 'u') {
  //     event.preventDefault();
  //   }
  // }
  //
  setMetaTags() {

    this.meta.addTags([
      { name: 'description', content: 'We specialize in Web & Mobile Apps, Hosting, Digital Marketing, Computers, Surveillance Cameras, Copiers, Plotters, Networks, Firefighting, Alarms, and Queue Management.' },
      { name: 'keywords', content: 'Web Development, Mobile Apps, Hosting, Digital Marketing, Computers, Surveillance Cameras, Copiers, Networks, Fire Alarms, Queue Management' },
      { name: 'author', content: 'Mogasoft Integrated Solutions' },
      { name: 'robots', content: 'index, follow' },

      { property: 'og:title', content: 'Mogasoft - Software & Hardware Solutions' },
      { property: 'og:description', content: 'Providing top-quality software and hardware solutions for businesses.' },
      { property: 'og:url', content: 'https://mogasoft.net/home' },
      { property: 'og:type', content: 'website' },

    ]);
  }
}
