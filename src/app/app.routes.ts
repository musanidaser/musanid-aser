import { Routes } from '@angular/router';

export const routes: Routes = [
  // Arabic Routes (Default)
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'sectors',
    loadComponent: () => import('./pages/sectors/sectors.component').then(m => m.SectorsComponent)
  },
  {
    path: 'request-quote',
    loadComponent: () => import('./pages/quote/quote.component').then(m => m.QuoteComponent)
  },
  {
    path: 'contact',
    redirectTo: 'request-quote'
  },
  {
    path: 'contact-us',
    redirectTo: 'request-quote'
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'privacy-policy',
    redirectTo: 'privacy'
  },

  // English Routes
  {
    path: 'en',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'en/about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'en/services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'en/sectors',
    loadComponent: () => import('./pages/sectors/sectors.component').then(m => m.SectorsComponent)
  },
  {
    path: 'en/request-quote',
    loadComponent: () => import('./pages/quote/quote.component').then(m => m.QuoteComponent)
  },
  {
    path: 'en/contact',
    redirectTo: 'en/request-quote'
  },
  {
    path: 'en/contact-us',
    redirectTo: 'en/request-quote'
  },
  {
    path: 'en/privacy',
    loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'en/privacy-policy',
    redirectTo: 'en/privacy'
  },

  // Fallback Catch-all
  {
    path: '**',
    redirectTo: ''
  }
];
