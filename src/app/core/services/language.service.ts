import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import arTranslations from '../../../assets/i18n/ar.json';
import enTranslations from '../../../assets/i18n/en.json';

export type TranslationSchema = typeof arTranslations;

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  currentLang: 'ar' | 'en' = 'ar';
  currentDir: 'rtl' | 'ltr' = 'rtl';

  readonly translations = signal<TranslationSchema>(arTranslations);

  get t(): TranslationSchema {
    return this.translations();
  }

  setLanguage(lang: 'ar' | 'en'): void {
    this.currentLang = lang;
    this.currentDir = lang === 'ar' ? 'rtl' : 'ltr';
    this.translations.set(lang === 'ar' ? arTranslations : enTranslations);

    if (this.document && this.document.documentElement) {
      this.document.documentElement.lang = lang;
      this.document.documentElement.dir = this.currentDir;
    }

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('musaned_lang', lang);
    }
  }

  /**
   * Generates localized internal URL maintaining current language context
   */
  link(path: string): string {
    const clean = path.startsWith('/') ? path : `/${path}`;
    if (this.currentLang === 'en') {
      if (clean === '/' || clean === '') return '/en';
      if (clean.startsWith('/en')) return clean;
      return `/en${clean}`;
    }
    // Arabic
    if (clean.startsWith('/en/')) {
      return clean.substring(3) || '/';
    }
    if (clean === '/en') {
      return '/';
    }
    return clean;
  }

  /**
   * Toggles between Arabic and English and navigates to matching counterpart URL
   */
  toggleLanguage(): void {
    const nextLang = this.currentLang === 'ar' ? 'en' : 'ar';
    const currentUrl = (this.router.url || '/').split('?')[0].split('#')[0];
    let targetUrl: string;

    if (nextLang === 'en') {
      targetUrl = currentUrl === '/' ? '/en' : (currentUrl.startsWith('/en') ? currentUrl : `/en${currentUrl}`);
    } else {
      targetUrl = currentUrl.startsWith('/en') ? (currentUrl.replace(/^\/en/, '') || '/') : currentUrl;
    }

    this.setLanguage(nextLang);
    this.router.navigateByUrl(targetUrl);
  }

  translate(path: string): string {
    const keys = path.split('.');
    let current: any = this.translations();
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return path;
      }
    }
    return typeof current === 'string' ? current : path;
  }

  isRtl(): boolean {
    return this.currentDir === 'rtl';
  }
}
