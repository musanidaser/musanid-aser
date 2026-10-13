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
  selector: 'app-sectors',
  standalone: true,
  imports: [RouterLink, InternalHeroComponent, InternalCtaComponent],
  templateUrl: './sectors.component.html',
  styleUrl: './sectors.component.css'
})
export class SectorsComponent implements AfterViewInit, OnDestroy {
  langService = inject(LanguageService);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('sectorsSwiper') swiperElRef!: ElementRef<HTMLDivElement>;
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
        nextEl: '.sectors-slider-nav-next',
        prevEl: '.sectors-slider-nav-prev'
      },
      pagination: {
        el: '.sectors-swiper-pagination',
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
