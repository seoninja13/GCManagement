import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  template: `
    <app-header></app-header>
    <main>
      <section class="hero">
        <div class="container">
          <h1>Simple, transparent pricing</h1>
          <p>Choose the plan that's right for your business</p>
        </div>
      </section>

      <section class="pricing">
        <div class="container">
          <div class="pricing-grid">
            <div class="pricing-card">
              <div class="pricing-header">
                <h3>Core</h3>
                <div class="price">
                  <span class="amount">$49</span>
                  <span class="period">/month</span>
                </div>
                <p>Perfect for small teams just getting started</p>
              </div>
              <div class="pricing-features">
                <ul>
                  <li>Up to 5 team members</li>
                  <li>Client management</li>
                  <li>Scheduling & dispatching</li>
                  <li>Invoicing & payments</li>
                  <li>Mobile app</li>
                </ul>
              </div>
              <a routerLink="/register" class="btn btn-primary">Start Free Trial</a>
            </div>

            <div class="pricing-card featured">
              <div class="pricing-header">
                <h3>Connect</h3>
                <div class="price">
                  <span class="amount">$99</span>
                  <span class="period">/month</span>
                </div>
                <p>Best for growing businesses</p>
              </div>
              <div class="pricing-features">
                <ul>
                  <li>Everything in Core, plus:</li>
                  <li>Unlimited team members</li>
                  <li>Advanced reporting</li>
                  <li>Custom forms</li>
                  <li>Time tracking</li>
                  <li>GPS tracking</li>
                </ul>
              </div>
              <a routerLink="/register" class="btn btn-primary">Start Free Trial</a>
            </div>

            <div class="pricing-card">
              <div class="pricing-header">
                <h3>Enterprise</h3>
                <div class="price">
                  <span class="contact">Contact us</span>
                </div>
                <p>For large organizations</p>
              </div>
              <div class="pricing-features">
                <ul>
                  <li>Everything in Connect, plus:</li>
                  <li>Custom integrations</li>
                  <li>API access</li>
                  <li>Dedicated support</li>
                  <li>Custom training</li>
                  <li>SLA guarantees</li>
                </ul>
              </div>
              <a href="mailto:sales@jobber.com" class="btn btn-primary">Contact Sales</a>
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
      opacity: 0.9;
    }

    .pricing {
      padding: 4rem 0;
    }

    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .pricing-card {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      text-align: center;
    }

    .pricing-card.featured {
      transform: scale(1.05);
      border: 2px solid var(--primary);
    }

    .pricing-header {
      margin-bottom: 2rem;
    }

    .price {
      margin: 1rem 0;
    }

    .amount {
      font-size: 2.5rem;
      font-weight: bold;
      color: var(--primary);
    }

    .period {
      color: var(--gray-600);
    }

    .contact {
      font-size: 1.5rem;
      color: var(--primary);
      font-weight: bold;
    }

    .pricing-features ul {
      list-style: none;
      padding: 0;
      margin: 0 0 2rem;
    }

    .pricing-features li {
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--gray-100);
    }
  `]
})
export class PricingComponent {}