import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h3>Product</h3>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Integration</a></li>
              <li><a href="#">Updates</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h3>Solutions</h3>
            <ul>
              <li><a href="#">Landscaping</a></li>
              <li><a href="#">Cleaning</a></li>
              <li><a href="#">Plumbing</a></li>
              <li><a href="#">Electrical</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h3>Resources</h3>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Guides</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Jobber. All rights reserved.</p>
          <div class="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      padding: 4rem 0 2rem;
      background-color: var(--secondary);
      color: white;
    }
    
    .footer-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      margin-bottom: 3rem;
    }
    
    .footer-col h3 {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }
    
    .footer-col ul {
      list-style: none;
    }
    
    .footer-col ul li {
      margin-bottom: 0.75rem;
    }
    
    .footer-col a {
      color: #a0aec0;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .footer-col a:hover {
      color: white;
    }
    
    .footer-bottom {
      padding-top: 2rem;
      border-top: 1px solid rgba(255,255,255,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .footer-bottom p {
      color: #a0aec0;
    }
    
    .footer-links {
      display: flex;
      gap: 1.5rem;
    }
    
    .footer-links a {
      color: #a0aec0;
      text-decoration: none;
    }
    
    .footer-links a:hover {
      color: white;
    }
  `]
})
export class FooterComponent {}