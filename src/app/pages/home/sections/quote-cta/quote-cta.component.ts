import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-quote-cta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './quote-cta.component.html',
  styleUrl: './quote-cta.component.css'
})
export class QuoteCtaComponent {
  langService = inject(LanguageService);
}
