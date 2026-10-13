import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { IntroductionComponent } from './sections/introduction/introduction.component';
import { ServicesPreviewComponent } from './sections/services-preview/services-preview.component';
import { SectorsPreviewComponent } from './sections/sectors-preview/sectors-preview.component';
import { WhyUsComponent } from './sections/why-us/why-us.component';
import { ProcessComponent } from './sections/process/process.component';
import { QuoteCtaComponent } from './sections/quote-cta/quote-cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    IntroductionComponent,
    ServicesPreviewComponent,
    SectorsPreviewComponent,
    WhyUsComponent,
    ProcessComponent,
    QuoteCtaComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
