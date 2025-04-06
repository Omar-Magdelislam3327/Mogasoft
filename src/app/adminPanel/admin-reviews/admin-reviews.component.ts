import { Component } from '@angular/core';
import { ReviewsService } from '../../core/services/reviews.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './admin-reviews.component.html',
  styleUrl: './admin-reviews.component.css'
})
export class AdminReviewsComponent {
  reviews!: any;
  reviewForm!: FormGroup;
  selectedImage: File | null = null;
  constructor(private reviewApi: ReviewsService, private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      FirstNameEN: ['', Validators.required],
      FirstNameAR: ['', Validators.required],
      LastNameEN: ['', Validators.required],
      LastNameAR: ['', Validators.required],
      ReviewTextEN: ['', Validators.required],
      ReviewTextAR: ['', Validators.required],
      PositionEN: ['', Validators.required],
      PositionAR: ['', Validators.required],
      Stars: ['', Validators.required],
      Image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews() {
    this.reviewApi.getReviews().subscribe(data => {
      this.reviews = data;
      console.log(data);
    })
  }
  getStars(stars: number): string {
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  submitReview() {
    if (this.reviewForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('FirstNameEN', this.reviewForm.get('FirstNameEN')?.value);
    formData.append('FirstNameAR', this.reviewForm.get('FirstNameAR')?.value);
    formData.append('LastNameEN', this.reviewForm.get('LastNameEN')?.value);
    formData.append('LastNameAR', this.reviewForm.get('LastNameAR')?.value);
    formData.append('ReviewTextEN', this.reviewForm.get('ReviewTextEN')?.value);
    formData.append('ReviewTextAR', this.reviewForm.get('ReviewTextAR')?.value);
    formData.append('PositionEN', this.reviewForm.get('PositionEN')?.value);
    formData.append('PositionAR', this.reviewForm.get('PositionAR')?.value);
    formData.append('Stars', this.reviewForm.get('Stars')?.value);
    if (this.selectedImage) {
      formData.append('Image', this.selectedImage);
    }
    this.reviewApi.addReview(formData).subscribe({
      next: (response) => {
        console.log('Review posted successfully:', response);
        this.getReviews();
        this.reviewForm.reset();
      },
      error: (error) => {
        console.error('Error posting review:', error);
      }
    })
  }

  deleteReview(id: number) {
    this.reviewApi.deleteReview(id).subscribe(
      (response) => {
        this.getReviews();
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
