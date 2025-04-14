import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.css'
})
export class ScrollToTopComponent {
  isVisible = false;
  clicked = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.isVisible = scrollY > window.innerHeight;
  }

  scrollToTop(): void {
    this.clicked = true;

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);

    setTimeout(() => {
      this.clicked = false;
    }, 500);
  }
}
