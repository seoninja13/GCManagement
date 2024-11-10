import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { HeroComponent } from './hero.component';
import { FeaturesComponent } from './features.component';
import { TestimonialsComponent } from './testimonials.component';
import { CtaComponent } from './cta.component';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    FeaturesComponent,
    TestimonialsComponent,
    CtaComponent,
    FooterComponent
  ],
  template: `
    <app-header></app-header>
    <app-hero></app-hero>
    <app-features></app-features>
    <app-testimonials></app-testimonials>
    <app-cta></app-cta>
    <app-footer></app-footer>
  `
})
export class HomeComponent {}