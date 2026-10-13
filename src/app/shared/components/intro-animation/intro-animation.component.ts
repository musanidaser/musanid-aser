import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  ChangeDetectorRef
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-intro-animation',
  standalone: true,
  imports: [],
  templateUrl: './intro-animation.component.html',
  styleUrl: './intro-animation.component.css'
})
export class IntroAnimationComponent implements OnInit, OnDestroy {
  langService = inject(LanguageService);
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private cdr = inject(ChangeDetectorRef);

  isVisible = false;
  isLeaving = false;

  private exitTimer: ReturnType<typeof setTimeout> | null = null;
  private removeTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly SESSION_STORAGE_KEY = 'musanid_intro_seen';

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      // Check if user already saw the intro during this browser session
      const alreadySeen = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
      const urlParams = new URLSearchParams(window.location.search);
      const forceIntro = urlParams.get('intro') === 'true';

      if (alreadySeen && !forceIntro) {
        this.isVisible = false;
        return;
      }

      // Mark session as seen
      sessionStorage.setItem(this.SESSION_STORAGE_KEY, 'true');

      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.isVisible = true;
      this.lockScroll();

      if (prefersReducedMotion) {
        // Fast, smooth bypass for reduced motion
        this.exitTimer = setTimeout(() => {
          this.isLeaving = true;
          this.cdr.markForCheck();

          this.removeTimer = setTimeout(() => {
            this.finishIntro();
          }, 150);
        }, 300);
      } else {
        // Standard timing: ~1.5s visual reveal + 0.4s fade transition = ~1.9s total
        this.exitTimer = setTimeout(() => {
          this.isLeaving = true;
          this.cdr.markForCheck();

          this.removeTimer = setTimeout(() => {
            this.finishIntro();
          }, 400);
        }, 1500);
      }
    } catch {
      // Fallback in case storage access is restricted
      this.finishIntro();
    }
  }

  private lockScroll(): void {
    if (this.document?.body) {
      this.document.body.style.overflow = 'hidden';
    }
  }

  private unlockScroll(): void {
    if (this.document?.body) {
      this.document.body.style.overflow = '';
    }
  }

  private finishIntro(): void {
    this.isVisible = false;
    this.isLeaving = false;
    this.unlockScroll();
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    if (this.exitTimer) {
      clearTimeout(this.exitTimer);
    }
    if (this.removeTimer) {
      clearTimeout(this.removeTimer);
    }
    this.unlockScroll();
  }
}
