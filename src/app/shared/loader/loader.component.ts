import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from '../../core/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  isLoading = false;
  private subscription = new Subscription();

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.subscription = this.loaderService.loading$.subscribe(
      isLoading => this.isLoading = isLoading
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
