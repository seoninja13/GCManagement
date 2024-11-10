import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header.component';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <app-header></app-header>
    <main>
      <section class="hero">
        <div class="container">
          <h1>Features that help you run a better business</h1>
          <p>Everything you need to manage your team, impress your clients, and run your business like a pro.</p>
        </div>
      </section>

      <section class="features">
        <div class="container">
          <div class="feature-grid">
            <div class="feature-card">
              <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500" alt="Scheduling">
              <h3>Smart Scheduling</h3>
              <p>Schedule jobs, dispatch teams, and track time with ease. Get a clear view of your business at a glance.</p>
            </div>
            <div class="feature-card">
              <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500" alt="Invoicing">
              <h3>Professional Invoicing</h3>
              <p>Create and send professional invoices in seconds. Get paid faster with online payments.</p>
            </div>
            <div class="feature-card">
              <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500" alt="Client Management">
              <h3>Client Management</h3>
              <p>Keep client information organized and accessible. Build stronger relationships with automated communication.</p>
            </div>
            <div class="feature-card">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500" alt="Reporting">
              <h3>Business Reporting</h3>
              <p>Get insights into your business performance with detailed reports and analytics.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .hero {
      background-color: var(--primary);
      color: white;
      padding: 8rem 0 4rem;
      text-align: center;
    }

    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1.5rem;
    }

    .hero p {
      font-size: 1.25rem;
      max-width: 600px;
      margin: 0 auto;
      opacity: 0.9;
    }

    .features {
      padding: 4rem 0;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .feature-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
    }

    .feature-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .feature-card h3 {
      padding: 1.5rem 1.5rem 0.5rem;
      color: var(--secondary);
    }

    .feature-card p {
      padding: 0 1.5rem 1.5rem;
      color: #666;
    }
  `]
})
export class FeaturesComponent {}