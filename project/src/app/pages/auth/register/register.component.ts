import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Create Your Account</h2>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="form-label">Business Name</label>
            <input 
              type="text" 
              formControlName="businessName"
              class="form-control"
              [class.error]="registerForm.get('businessName')?.touched && registerForm.get('businessName')?.invalid"
            >
          </div>

          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input 
              type="text" 
              formControlName="fullName"
              class="form-control"
              [class.error]="registerForm.get('fullName')?.touched && registerForm.get('fullName')?.invalid"
            >
          </div>

          <div class="form-group">
            <label class="form-label">Email</label>
            <input 
              type="email" 
              formControlName="email"
              class="form-control"
              [class.error]="registerForm.get('email')?.touched && registerForm.get('email')?.invalid"
            >
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <input 
              type="password" 
              formControlName="password"
              class="form-control"
              [class.error]="registerForm.get('password')?.touched && registerForm.get('password')?.invalid"
            >
          </div>

          <button type="submit" class="btn btn-primary w-full" [disabled]="registerForm.invalid || isLoading">
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </button>

          <div class="auth-links">
            <a routerLink="/login">Already have an account? Log in</a>
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
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      businessName: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      try {
        const { email, password, ...userData } = this.registerForm.value;
        await this.authService.register(email, password, userData);
      } catch (error) {
        console.error('Registration error:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
}