import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.css'
})
export class WhyUsComponent {
  langService = inject(LanguageService);
}
