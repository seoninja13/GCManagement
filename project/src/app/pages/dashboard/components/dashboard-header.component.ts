import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="search">
        <input 
          type="text" 
          placeholder="Search..." 
          class="search-input"
        >
      </div>

      <div class="header-actions">
        <button class="btn-icon">
          <span class="icon">🔔</span>
        </button>
        
        <div class="user-menu" (click)="toggleUserMenu()">
          <img 
            [src]="(user$ | async)?.photoURL || 'assets/default-avatar.png'" 
            alt="User avatar"
            class="avatar"
          >
          <span class="user-name">{{ (user$ | async)?.displayName }}</span>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: white;
      padding: 1rem 2rem;
      border-bottom: 1px solid var(--gray-200);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .search-input {
      padding: 0.5rem 1rem;
      border: 1px solid var(--gray-200);
      border-radius: 0.375rem;
      width: 300px;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .btn-icon {
      background: none;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
      border-radius: 0.375rem;
    }

    .btn-icon:hover {
      background-color: var(--gray-100);
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      cursor: pointer;
      border-radius: 0.375rem;
    }

    .user-menu:hover {
      background-color: var(--gray-100);
    }

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    .user-name {
      font-weight: 500;
      color: var(--gray-700);
    }
  `]
})
export class DashboardHeaderComponent {
  user$ = this.authService.user$;

  constructor(private authService: AuthService) {}

  toggleUserMenu() {
    // Implement user menu toggle
  }
}