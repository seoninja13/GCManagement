import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="container hero-content">
        <div class="hero-text">
          <h1>Run a better home service business</h1>
          <p>The all-in-one software that helps home service businesses quote, schedule, invoice, and get paid—faster.</p>
          <a [routerLink]="['/register']" class="btn btn-primary">Try Jobber Free</a>
        </div>
        <div class="hero-image">
          <img src="assets/hero-image.jpg" alt="Home Service Professional">
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      padding: 8rem 0 4rem;
      background-color: var(--light);
    }
    
    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }
    
    .hero-text h1 {
      font-size: 3.5rem;
      line-height: 1.2;
      color: var(--secondary);
      margin-bottom: 1.5rem;
    }
    
    .hero-text p {
      font-size: 1.25rem;
      color: #4a5568;
      margin-bottom: 2rem;
    }
    
    .hero-image img {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }

    .btn {
      display: inline-block;
      text-decoration: none;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .hero-text h1 {
        font-size: 2.5rem;
      }
    }
  `]
})
export class HeroComponent {}