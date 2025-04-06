import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../../core/services/blogs.service';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-admin-blogs-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    EditorModule
  ],
  templateUrl: './admin-blogs-edit.component.html',
  styleUrl: './admin-blogs-edit.component.css'
})
export class AdminBlogsEditComponent {
  blogForm!: FormGroup;
  selectedImage!: any;
  blogId!: any;
  //

  constructor(private fb: FormBuilder, private blogService: BlogsService, private route: ActivatedRoute, private cdr: ChangeDetectorRef, private router: Router) {
    this.blogId = this.route.snapshot.paramMap.get('id');
    if (this.blogId) {
      this.loadBlogData(this.blogId);
    }
  }
  ngOnInit(): void {
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
  loadBlogData(blogId: number): void {
    this.blogService.getBlogById(blogId).subscribe((blog: any) => {
      console.log('Blog:', blog);

      this.blogForm.patchValue({
        TitleAR: blog.titleAR,
        TitleEN: blog.titleEN,
        DescriptionAR: blog.descriptionAR,
        DescriptionEN: blog.descriptionEN,
        Category: blog.category
      });

      setTimeout(() => {
        this.blogForm.get('ContentAR')?.setValue(blog.contentAR);
        this.blogForm.get('ContentEN')?.setValue(blog.contentEN);

        console.log('With Content:', this.blogForm.value);

        this.cdr.detectChanges();
      }, 100);
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

    this.blogService.updateBlog(this.blogId, formData).subscribe({
      next: (response) => {
        console.log('Blog updated successfully:', response);
        this.router.navigate(['/admin/blogs']);
      },
      error: (error) => {
        console.error('Error posting blog:', error);
      }
    });
  }
}
