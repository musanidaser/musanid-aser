import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InternalHeroComponent } from '../../shared/components/internal-hero/internal-hero.component';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterLink, InternalHeroComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
export class PrivacyComponent {
  langService = inject(LanguageService);

  scrollToSection(id: string, event: MouseEvent): void {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 90;
      const targetTop = element.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    }
  }
}
