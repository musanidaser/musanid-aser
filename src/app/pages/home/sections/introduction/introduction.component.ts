import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css'
})
export class IntroductionComponent {
  langService = inject(LanguageService);
}
