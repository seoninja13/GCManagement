import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  template: `
    <section class="testimonials">
      <div class="container">
        <h2>Trusted by thousands of service professionals</h2>
        <div class="testimonial-grid">
          <div class="testimonial-card">
            <div class="stars">★★★★★</div>
            <p>"Jobber has helped us grow our business by 30% while saving 10 hours every week on paperwork."</p>
            <div class="author">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150" alt="John Smith">
              <div>
                <h4>John Smith</h4>
                <span>Landscaping Pro</span>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="stars">★★★★★</div>
            <p>"The best investment I've made in my business. Customer service is amazing and the software is easy to use."</p>
            <div class="author">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150" alt="Sarah Johnson">
              <div>
                <h4>Sarah Johnson</h4>
                <span>Cleaning Services</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials {
      padding: 4rem 0;
      background-color: var(--light);
    }
    
    h2 {
      text-align: center;
      font-size: 2.5rem;
      color: var(--secondary);
      margin-bottom: 3rem;
    }
    
    .testimonial-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
    
    .testimonial-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .stars {
      color: #fbbf24;
      margin-bottom: 1rem;
    }
    
    .testimonial-card p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
      color: #4a5568;
    }
    
    .author {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .author img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .author h4 {
      color: var(--secondary);
      margin: 0;
    }
    
    .author span {
      color: #718096;
      font-size: 0.9rem;
    }
  `]
})
export class TestimonialsComponent {}