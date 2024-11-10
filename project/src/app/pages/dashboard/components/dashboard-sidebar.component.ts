import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="assets/logo.svg" alt="Jobber" class="logo">
      </div>

      <nav class="sidebar-nav">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
          <span class="icon">📊</span>
          Dashboard
        </a>
        <a routerLink="/jobs" routerLinkActive="active" class="nav-item">
          <span class="icon">📋</span>
          Jobs
        </a>
        <a routerLink="/calendar" routerLinkActive="active" class="nav-item">
          <span class="icon">📅</span>
          Calendar
        </a>
        <a routerLink="/clients" routerLinkActive="active" class="nav-item">
          <span class="icon">👥</span>
          Clients
        </a>
        <a routerLink="/invoices" routerLinkActive="active" class="nav-item">
          <span class="icon">💰</span>
          Invoices
        </a>
        <a routerLink="/settings" routerLinkActive="active" class="nav-item">
          <span class="icon">⚙️</span>
          Settings
        </a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 240px;
      background: white;
      border-right: 1px solid var(--gray-200);
      height: 100vh;
      position: sticky;
      top: 0;
    }

    .sidebar-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--gray-200);
    }

    .logo {
      height: 32px;
    }

    .sidebar-nav {
      padding: 1rem 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      color: var(--gray-700);
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .nav-item:hover {
      background-color: var(--gray-50);
      color: var(--primary);
    }

    .nav-item.active {
      background-color: var(--primary);
      color: white;
    }

    .icon {
      margin-right: 0.75rem;
      font-size: 1.25rem;
    }
  `]
})
export class DashboardSidebarComponent {}