import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header.component';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <app-header></app-header>
    <main>
      <section class="hero">
        <div class="container">
          <h1>Resources to help you grow</h1>
          <p>Guides, tips, and tools to help your business succeed</p>
        </div>
      </section>

      <section class="resources">
        <div class="container">
          <div class="resources-grid">
            <div class="resource-card">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500" alt="Blog">
              <div class="content">
                <h3>Blog</h3>
                <p>Tips and strategies to help you run a more successful business.</p>
                <a href="#" class="btn btn-secondary">Read Articles</a>
              </div>
            </div>

            <div class="resource-card">
              <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500" alt="Guides">
              <div class="content">
                <h3>Free Guides</h3>
                <p>In-depth guides on marketing, operations, and growth.</p>
                <a href="#" class="btn btn-secondary">Download Guides</a>
              </div>
            </div>

            <div class="resource-card">
              <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500" alt="Webinars">
              <div class="content">
                <h3>Webinars</h3>
                <p>Live and recorded sessions with industry experts.</p>
                <a href="#" class="btn btn-secondary">Watch Webinars</a>
              </div>
            </div>

            <div class="resource-card">
              <img src="https://images.unsplash.com/photo-1552581234-26160f608093?w=500" alt="Support">
              <div class="content">
                <h3>Help Center</h3>
                <p>Detailed documentation and support resources.</p>
                <a href="#" class="btn btn-secondary">Get Help</a>
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
      opacity: 0.9;
    }

    .resources {
      padding: 4rem 0;
    }

    .resources-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .resource-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .resource-card:hover {
      transform: translateY(-5px);
    }

    .resource-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .content {
      padding: 1.5rem;
    }

    .content h3 {
      color: var(--secondary);
      margin-bottom: 0.5rem;
    }

    .content p {
      color: #666;
      margin-bottom: 1.5rem;
    }

    .btn {
      width: 100%;
      text-align: center;
    }
  `]
})
export class ResourcesComponent {}