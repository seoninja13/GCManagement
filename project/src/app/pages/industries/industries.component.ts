import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header.component';

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <app-header></app-header>
    <main>
      <section class="hero">
        <div class="container">
          <h1>Solutions for every service business</h1>
          <p>No matter what industry you're in, we have the tools you need to succeed</p>
        </div>
      </section>

      <section class="industries">
        <div class="container">
          <div class="industry-grid">
            <div class="industry-card">
              <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500" alt="Landscaping">
              <div class="content">
                <h3>Landscaping</h3>
                <p>Manage your lawn care and landscaping business with ease. Schedule crews, track time, and invoice clients.</p>
                <a href="#" class="btn btn-primary">Learn More</a>
              </div>
            </div>

            <div class="industry-card">
              <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500" alt="Cleaning">
              <div class="content">
                <h3>Cleaning</h3>
                <p>Keep your cleaning business organized. Schedule recurring visits, manage staff, and grow your customer base.</p>
                <a href="#" class="btn btn-primary">Learn More</a>
              </div>
            </div>

            <div class="industry-card">
              <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500" alt="Plumbing">
              <div class="content">
                <h3>Plumbing</h3>
                <p>Run your plumbing business efficiently. Dispatch teams, manage emergencies, and handle billing professionally.</p>
                <a href="#" class="btn btn-primary">Learn More</a>
              </div>
            </div>

            <div class="industry-card">
              <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500" alt="Electrical">
              <div class="content">
                <h3>Electrical</h3>
                <p>Streamline your electrical business operations. Schedule jobs, create estimates, and track project progress.</p>
                <a href="#" class="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .hero {
      background-color: var(--secondary);
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

    .industries {
      padding: 4rem 0;
    }

    .industry-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .industry-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .industry-card:hover {
      transform: translateY(-5px);
    }

    .industry-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .content {
      padding: 1.5rem;
    }

    .content h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .content p {
      color: var(--gray-600);
      margin-bottom: 1.5rem;
    }
  `]
})
export class IndustriesComponent {}