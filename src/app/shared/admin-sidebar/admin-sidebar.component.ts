import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
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
