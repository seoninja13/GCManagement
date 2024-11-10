import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Welcome Back</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input 
              type="email" 
              formControlName="email"
              class="form-control"
              [class.error]="loginForm.get('email')?.touched && loginForm.get('email')?.invalid"
            >
            <div class="error-message" *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.invalid">
              Please enter a valid email
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <input 
              type="password" 
              formControlName="password"
              class="form-control"
              [class.error]="loginForm.get('password')?.touched && loginForm.get('password')?.invalid"
            >
            <div class="error-message" *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.invalid">
              Password is required
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-full" [disabled]="loginForm.invalid || isLoading">
            {{ isLoading ? 'Logging in...' : 'Log In' }}
          </button>

          <div class="auth-links">
            <a routerLink="/forgot-password">Forgot password?</a>
            <a routerLink="/register">Don't have an account? Sign up</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background-color: var(--light);
    }

    .auth-card {
      background: white;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: var(--gray-900);
      font-size: 1.5rem;
      font-weight: 600;
    }

    .w-full {
      width: 100%;
    }

    .auth-links {
      margin-top: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    }

    .auth-links a {
      color: var(--primary);
      text-decoration: none;
      font-size: 0.875rem;
    }

    .auth-links a:hover {
      text-decoration: underline;
    }

    .error {
      border-color: #dc2626;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      try {
        const { email, password } = this.loginForm.value;
        await this.authService.login(email, password);
      } catch (error) {
        console.error('Login error:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
}