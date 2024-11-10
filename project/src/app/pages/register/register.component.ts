import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="register-container">
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
        <h2>Create your account</h2>
        
        <div class="form-group">
          <label for="name">Full Name</label>
          <input 
            id="name"
            type="text"
            formControlName="name"
            class="form-control"
            placeholder="Enter your full name"
          >
          <div class="error-message" *ngIf="registerForm.get('name')?.touched && registerForm.get('name')?.errors?.['required']">
            Name is required
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email"
            type="email"
            formControlName="email"
            class="form-control"
            placeholder="Enter your email"
          >
          <div class="error-message" *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.errors?.['required']">
            Email is required
          </div>
          <div class="error-message" *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.errors?.['email']">
            Please enter a valid email
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            id="password"
            type="password"
            formControlName="password"
            class="form-control"
            placeholder="Create a password"
          >
          <div class="error-message" *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.errors?.['required']">
            Password is required
          </div>
          <div class="error-message" *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.errors?.['minlength']">
            Password must be at least 6 characters
          </div>
        </div>

        <div class="form-group">
          <label for="company">Company Name (Optional)</label>
          <input 
            id="company"
            type="text"
            formControlName="company"
            class="form-control"
            placeholder="Enter your company name"
          >
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="registerForm.invalid || isLoading">
          {{ isLoading ? 'Creating account...' : 'Create Account' }}
        </button>

        <div class="error-message" *ngIf="error">{{ error }}</div>
        
        <p class="login-link">
          Already have an account? <a [routerLink]="['/login']">Log in</a>
        </p>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      background-color: var(--light);
    }

    .register-form {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    h2 {
      text-align: center;
      color: var(--secondary);
      margin-bottom: 2rem;
      font-size: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--secondary);
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: var(--primary);
    }

    .btn {
      width: 100%;
      padding: 0.75rem;
      margin-top: 1rem;
      border: none;
      border-radius: 4px;
      background-color: var(--primary);
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .btn:disabled {
      background-color: #a0aec0;
      cursor: not-allowed;
    }

    .error-message {
      color: #e53e3e;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .login-link {
      text-align: center;
      margin-top: 1.5rem;
      color: #718096;
    }

    .login-link a {
      color: var(--primary);
      text-decoration: none;
      font-weight: 500;
    }

    .login-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      company: ['']
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.error = '';
      
      try {
        const { email, password, name, company } = this.registerForm.value;
        const userCredential = await this.auth.register(email, password);
        
        if (userCredential && userCredential.user) {
          // Update the user profile with the name
          await this.auth.updateUserProfile(userCredential.user, {
            displayName: name
          });
          
          // Store additional user data in Firestore
          await this.auth.createUserData(userCredential.user.uid, {
            name,
            email,
            company,
            createdAt: new Date()
          });
          
          await this.router.navigate(['/dashboard']);
        }
      } catch (err: any) {
        console.error('Registration error:', err);
        if (err.code === 'auth/email-already-in-use') {
          this.error = 'This email is already registered. Please try logging in instead.';
        } else {
          this.error = 'Registration failed. Please try again.';
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
}