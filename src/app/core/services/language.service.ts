import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import arTranslations from '../../../assets/i18n/ar.json';
import enTranslations from '../../../assets/i18n/en.json';

export type TranslationSchema = typeof arTranslations;

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  currentLang: 'ar' | 'en' = 'ar';
  currentDir: 'rtl' | 'ltr' = 'rtl';

  readonly translations = signal<TranslationSchema>(arTranslations);

  get t(): TranslationSchema {
    return this.translations();
  }

  constructor() {
    this.initLanguage();
  }

  private initLanguage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('musaned_lang') as 'ar' | 'en' | null;
      if (savedLang === 'ar' || savedLang === 'en') {
        this.setLanguage(savedLang);
        return;
      }
    }
    this.setLanguage('ar');
  }

  setLanguage(lang: 'ar' | 'en'): void {
    this.currentLang = lang;
    this.currentDir = lang === 'ar' ? 'rtl' : 'ltr';
    this.translations.set(lang === 'ar' ? arTranslations : enTranslations);

    if (isPlatformBrowser(this.platformId) && this.document && this.document.documentElement) {
      this.document.documentElement.lang = lang;
      this.document.documentElement.dir = this.currentDir;
    }

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('musaned_lang', lang);
    }
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

  toggleLanguage(): void {
    const nextLang = this.currentLang === 'ar' ? 'en' : 'ar';
    this.setLanguage(nextLang);
  }

  isRtl(): boolean {
    return this.currentDir === 'rtl';
  }
}
