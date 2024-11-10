import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="header">
      <div class="container header-content">
        <div class="logo">
          <a [routerLink]="['/']" class="text-primary font-bold text-2xl">Jobber</a>
        </div>
        <nav class="nav">
          <ul>
            <li><a [routerLink]="['/features']">Features</a></li>
            <li><a [routerLink]="['/industries']">Industries</a></li>
            <li><a [routerLink]="['/pricing']">Pricing</a></li>
            <li><a [routerLink]="['/resources']">Resources</a></li>
          </ul>
        </nav>
        <div class="auth-buttons">
          <a [routerLink]="['/login']" class="btn btn-secondary">Log in</a>
          <a [routerLink]="['/register']" class="btn btn-primary">Try Jobber Free</a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      padding: 1rem 0;
      background: white;
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .nav ul {
      display: flex;
      gap: 2rem;
      list-style: none;
    }
    
    .nav a {
      text-decoration: none;
      color: var(--secondary);
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .nav a:hover {
      color: var(--primary);
    }
    
    .auth-buttons {
      display: flex;
      gap: 1rem;
    }

    .auth-buttons a {
      text-decoration: none;
    }
  `]
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}
}