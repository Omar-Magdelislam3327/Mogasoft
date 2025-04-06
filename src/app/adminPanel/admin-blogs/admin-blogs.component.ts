import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BlogsService } from '../../core/services/blogs.service';
import { EditorModule } from 'primeng/editor';
@Component({
  selector: 'app-admin-blogs',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    EditorModule
  ],
  templateUrl: './admin-blogs.component.html',
  styleUrl: './admin-blogs.component.css'
})
export class AdminBlogsComponent {
  blogForm!: FormGroup;
  selectedImage: File | null = null;
  //
  blogs: any;
  //
  role!: any;
  constructor(private fb: FormBuilder, private blogService: BlogsService) {
    this.role = localStorage.getItem('userRole');
  }

  ngOnInit(): void {
    this.getAllBlogs();
    this.blogForm = this.fb.group({
      TitleAR: ['', Validators.required],
      TitleEN: ['', Validators.required],
      DescriptionAR: ['', Validators.required],
      DescriptionEN: ['', Validators.required],
      ContentAR: ['', Validators.required],
      ContentEN: ['', Validators.required],
      Category: ['', Validators.required],
      Image: [null, Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  submitBlog() {
    if (this.blogForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('TitleAR', this.blogForm.get('TitleAR')?.value);
    formData.append('TitleEN', this.blogForm.get('TitleEN')?.value);
    formData.append('DescriptionAR', this.blogForm.get('DescriptionAR')?.value);
    formData.append('DescriptionEN', this.blogForm.get('DescriptionEN')?.value);
    formData.append('ContentAR', this.blogForm.get('ContentAR')?.value);
    formData.append('ContentEN', this.blogForm.get('ContentEN')?.value);
    formData.append('Category', this.blogForm.get('Category')?.value);

    if (this.selectedImage) {
      formData.append('Image', this.selectedImage);
    }

    this.blogService.addBlog(formData).subscribe({

      next: (response) => {
        console.log('Blog posted successfully:', response);
        this.getAllBlogs();
        this.blogForm.reset();
      },
      error: (error) => {
        console.error('Error posting blog:', error);
      }
    });
  }
  getAllBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (data: any) => {
        this.blogs = data.data;
        console.log(this.blogs);
      },
      error: (error) => {
        console.error('Error fetching blogs:', error);
      }
    })
  }
  deleteBlog(id: number) {
    this.blogService.deleteBlog(id).subscribe({
      next: () => {
        this.getAllBlogs();
      },
      error: (error) => {
        console.error('Error deleting blog:', error);
      }
    })
  }
}
