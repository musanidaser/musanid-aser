import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'مؤسسة مساند آسر للإمداد والوساطة التجارية | Musanid Aser'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'من نحن | About Us - Musanid Aser'
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
    title: 'خدماتنا | Services - Musanid Aser'
  },
  {
    path: 'sectors',
    loadComponent: () => import('./pages/sectors/sectors.component').then(m => m.SectorsComponent),
    title: 'القطاعات | Sectors - Musanid Aser'
  },
  {
    path: 'request-quote',
    loadComponent: () => import('./pages/quote/quote.component').then(m => m.QuoteComponent),
    title: 'طلب تسعيرة وتواصل معنا | Musanid Aser'
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
    loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent),
    title: 'سياسة الخصوصية وحماية البيانات | Privacy Policy - Musanid Aser'
  },
  {
    path: 'privacy-policy',
    redirectTo: 'privacy'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
