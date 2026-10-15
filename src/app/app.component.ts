import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { WhatsappButtonComponent } from './shared/components/whatsapp-button/whatsapp-button.component';
import { IntroAnimationComponent } from './shared/components/intro-animation/intro-animation.component';
import { LanguageService } from './core/services/language.service';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, WhatsappButtonComponent, IntroAnimationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  langService = inject(LanguageService);
  private seoService = inject(SeoService);
  private router = inject(Router);

  ngOnInit(): void {
    // Initial sync for server-side prerender and direct client entry
    this.syncRoute(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.syncRoute(event.urlAfterRedirects || event.url);
      });
  }

  private syncRoute(url: string): void {
    const cleanUrl = (url || '/').split('?')[0].split('#')[0];
    const isEnglish = cleanUrl === '/en' || cleanUrl.startsWith('/en/');
    this.langService.setLanguage(isEnglish ? 'en' : 'ar');
    this.seoService.updateTags(cleanUrl);
  }
}

export const App = AppComponent;
