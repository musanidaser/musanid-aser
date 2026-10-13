import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-internal-cta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './internal-cta.component.html',
  styleUrl: './internal-cta.component.css'
})
export class InternalCtaComponent {
  langService = inject(LanguageService);

  @Input() label?: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() buttonText?: string;
  @Input() buttonLink: string = '/request-quote';
  @Input() bgImage: string = '/cta.png';
}
