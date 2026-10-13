import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-internal-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './internal-hero.component.html',
  styleUrl: './internal-hero.component.css'
})
export class InternalHeroComponent {
  langService = inject(LanguageService);

  @Input({ required: true }) bgImage!: string;
  @Input({ required: true }) eyebrow!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input() ctaText?: string;
  @Input() ctaLink?: string;
  @Input() imageAlt?: string;

  onCtaClick(event: MouseEvent): void {
    if (this.ctaLink && this.ctaLink.startsWith('#')) {
      event.preventDefault();
      const target = document.querySelector(this.ctaLink);
      if (target) {
        const navOffset = 85;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      }
    }
  }
}
