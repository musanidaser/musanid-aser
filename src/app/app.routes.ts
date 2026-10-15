import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { SectorsComponent } from './pages/sectors/sectors.component';
import { QuoteComponent } from './pages/quote/quote.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

export const routes: Routes = [
  // Arabic Routes (Default)
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'sectors',
    component: SectorsComponent
  },
  {
    path: 'request-quote',
    component: QuoteComponent
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
    component: PrivacyComponent
  },
  {
    path: 'privacy-policy',
    redirectTo: 'privacy'
  },

  // English Routes
  {
    path: 'en',
    component: HomeComponent
  },
  {
    path: 'en/about',
    component: AboutComponent
  },
  {
    path: 'en/services',
    component: ServicesComponent
  },
  {
    path: 'en/sectors',
    component: SectorsComponent
  },
  {
    path: 'en/request-quote',
    component: QuoteComponent
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
    component: PrivacyComponent
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
