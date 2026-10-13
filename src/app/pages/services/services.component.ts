import {
  Component,
  inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InternalHeroComponent } from '../../shared/components/internal-hero/internal-hero.component';
import { InternalCtaComponent } from '../../shared/components/internal-cta/internal-cta.component';
import { LanguageService } from '../../core/services/language.service';
import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, InternalHeroComponent, InternalCtaComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  langService = inject(LanguageService);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('servicesSwiper') swiperElRef!: ElementRef<HTMLDivElement>;
  private swiperInstance: Swiper | null = null;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initSwiper();
      }, 50);
    }
  }

  ngOnDestroy(): void {
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
      this.swiperInstance = null;
    }
  }

  private initSwiper(): void {
    if (!this.swiperElRef?.nativeElement) return;

    this.swiperInstance = new Swiper(this.swiperElRef.nativeElement, {
      modules: [Navigation, Pagination, Keyboard, A11y],
      slidesPerView: 3,
      spaceBetween: 28,
      grabCursor: true,
      speed: 600,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: '.slider-nav-next',
        prevEl: '.slider-nav-prev'
      },
      pagination: {
        el: '.services-swiper-pagination',
        clickable: true
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      breakpoints: {
        0: {
          slidesPerView: 1.15,
          spaceBetween: 16
        },
        680: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 28
        }
      }
    });
  }
}
