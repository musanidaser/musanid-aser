import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../../core/services/language.service';
import { sectors } from '../../../../shared/data/sectors';

@Component({
  selector: 'app-sectors-preview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sectors-preview.component.html',
  styleUrl: './sectors-preview.component.css'
})
export class SectorsPreviewComponent {
  langService = inject(LanguageService);

  primarySectorMeta = {
    index: 0,
    image: 'sectors/companies-organizations.jpg'
  };

  secondarySectorsMeta = [
    {
      index: 1,
      image: 'sectors/restaurants-cafes.jpg'
    },
    {
      index: 4,
      image: 'sectors/projects-businesses.jpg'
    }
  ];
}
