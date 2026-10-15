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

  isVisible = true;
  isLeaving = false;

  private exitTimer: ReturnType<typeof setTimeout> | null = null;
  private removeTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Activate the intro on initial page load / refresh
    this.isVisible = true;
    this.lockScroll();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      this.exitTimer = setTimeout(() => {
        this.finishIntro();
      }, 350);
    } else {
      // Elegant cinematic duration: 2.2s presentation + smooth exit
      this.exitTimer = setTimeout(() => {
        this.finishIntro();
      }, 2200);
    }
  }

  finishIntro(): void {
    if (this.exitTimer) clearTimeout(this.exitTimer);
    if (this.removeTimer) clearTimeout(this.removeTimer);

    if (this.isLeaving) return;
    this.isLeaving = true;
    this.cdr.markForCheck();

    this.removeTimer = setTimeout(() => {
      this.isVisible = false;
      this.isLeaving = false;
      this.unlockScroll();
      this.cdr.markForCheck();
    }, 700);
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

  ngOnDestroy(): void {
    if (this.exitTimer) clearTimeout(this.exitTimer);
    if (this.removeTimer) clearTimeout(this.removeTimer);
    this.unlockScroll();
  }
}
