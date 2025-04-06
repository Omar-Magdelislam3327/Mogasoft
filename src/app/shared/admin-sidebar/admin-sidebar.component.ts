import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  role!: any;
  constructor(private authService: AuthService) {
    this.authService.isAuthenticated.subscribe(() => {
      this.role = localStorage.getItem('userRole');
    })
  }
  logout() {
    this.authService.logout();
  }
}
