import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header.component';
import { HeroComponent } from '../../components/hero.component';
import { FeaturesComponent } from '../../components/features.component';
import { TestimonialsComponent } from '../../components/testimonials.component';
import { CtaComponent } from '../../components/cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    FeaturesComponent,
    TestimonialsComponent,
    CtaComponent
  ],
  template: `
    <app-header></app-header>
    <main>
      <app-hero></app-hero>
      <app-features></app-features>
      <app-testimonials></app-testimonials>
      <app-cta></app-cta>
    </main>
  `
})
export class HomeComponent {}