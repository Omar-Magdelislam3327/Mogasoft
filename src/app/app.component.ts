import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import * as AOS from 'aos';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mogasoft';

  constructor(private meta: Meta) {
    this.setMetaTags();

    if (environment.production) {
      // this.loadFacebookPixel();
      this.loadTikTokPixel();
      this.loadGoogleAnalytics();
    }
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

  // private loadFacebookPixel(): void {
  //   if (!environment.facebookPixelId) return;

  //   this.loadScript('https://connect.facebook.net/en_US/fbevents.js', () => {
  //     (window as any).fbq = (window as any).fbq || function () {
  //       (window as any).fbq.callMethod ?
  //         (window as any).fbq.callMethod.apply((window as any).fbq, arguments) :
  //         (window as any).fbq.queue.push(arguments);
  //     };

  //     (window as any).fbq('init', environment.facebookPixelId);
  //     (window as any).fbq('track', 'PageView');
  //   });
  // }

  private loadTikTokPixel(): void {
    if (!environment.tiktokPixelId) return;

    this.loadScript(`https://analytics.tiktok.com/i18n/pixel/sdk.js?sdkid=${environment.tiktokPixelId}`, () => {
      (window as any).ttq = (window as any).ttq || [];
      (window as any).ttq.push(['init', environment.tiktokPixelId]);
      (window as any).ttq.push(['track', 'PageView']);
    });
  }

  private loadGoogleAnalytics(): void {
    if (!environment.googleAnalyticsId) return;

    this.loadScript(`https://www.googletagmanager.com/gtag/js?id=${environment.googleAnalyticsId}`, () => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag = function (...args: any[]) {
        (window as any).dataLayer.push(args);
      };
      (window as any).gtag('js', new Date());
      (window as any).gtag('config', environment.googleAnalyticsId);
    });
  }

  private loadScript(src: string, onLoad: () => void): void {
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    script.onload = onLoad;
    document.head.appendChild(script);
  }
}
