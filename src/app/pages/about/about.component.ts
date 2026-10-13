import { Component, inject } from '@angular/core';
import { InternalHeroComponent } from '../../shared/components/internal-hero/internal-hero.component';
import { InternalCtaComponent } from '../../shared/components/internal-cta/internal-cta.component';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [InternalHeroComponent, InternalCtaComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  langService = inject(LanguageService);

  principleIcons = [
    'fa-solid fa-eye',
    'fa-solid fa-sitemap',
    'fa-solid fa-sliders',
    'fa-solid fa-fingerprint'
  ];

  philosophySteps = [
    { icon: 'fa-solid fa-lightbulb', ar: 'فهم الاحتياج', en: 'Understand Needs' },
    { icon: 'fa-solid fa-magnifying-glass-location', ar: 'استقطاب الموردين', en: 'Source Suppliers' },
    { icon: 'fa-solid fa-scale-balanced', ar: 'مقارنة العروض', en: 'Compare Quotes' },
    { icon: 'fa-solid fa-boxes-stacked', ar: 'تنسيق الإمداد', en: 'Coordinate Supply' }
  ];
}
