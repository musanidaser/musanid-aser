import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../../core/services/language.service';
import { services } from '../../../../shared/data/services';

@Component({
  selector: 'app-services-preview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services-preview.component.html',
  styleUrl: './services-preview.component.css'
})
export class ServicesPreviewComponent {
  langService = inject(LanguageService);

  featuredServiceMeta = [
    { index: 0, image: 'services/business-supply.jpg' },
    { index: 1, image: 'services/commercial-brokerage.jpg' },
    { index: 5, image: 'services/custom-supply-solutions.jpg' }
  ];
}
