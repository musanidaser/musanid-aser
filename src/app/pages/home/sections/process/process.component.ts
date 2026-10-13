import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [],
  templateUrl: './process.component.html',
  styleUrl: './process.component.css'
})
export class ProcessComponent {
  langService = inject(LanguageService);

  stepIcons = [
    'fa-solid fa-file-invoice',
    'fa-solid fa-clipboard-check',
    'fa-solid fa-magnifying-glass-chart',
    'fa-solid fa-table-columns',
    'fa-solid fa-file-signature',
    'fa-solid fa-truck-ramp-box'
  ];
}
