import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to take your business to the next level?</h2>
          <p>Start your 14-day free trial today. No credit card required.</p>
          <div class="cta-buttons">
            <a [routerLink]="['/register']" class="btn btn-primary">Try Jobber Free</a>
            <button class="btn btn-secondary">Watch Demo</button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cta {
      padding: 4rem 0;
      background-color: var(--primary);
      color: white;
    }
    
    .cta-content {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }
    
    h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    
    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    
    .btn-primary {
      background: white;
      color: var(--primary);
      text-decoration: none;
    }
    
    .btn-secondary {
      background: transparent;
      border: 2px solid white;
      color: white;
    }
  `]
})
export class CtaComponent {}