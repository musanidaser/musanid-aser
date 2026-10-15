import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords?: string;
  breadcrumbName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  private readonly baseUrl = 'https://musanidaser.com';

  private readonly seoData: Record<string, { ar: PageSeoConfig; en: PageSeoConfig }> = {
    '': {
      ar: {
        title: 'مؤسسة مساند آسر للإمداد والوساطة التجارية | Musanid Aser',
        description: 'مساند آسر للإمداد والوساطة التجارية بالرياض — شريكك المهني في استقطاب الموردين، مقارنة عروض الأسعار، وإدارة التوريد للشركات والمنشآت في السعودية.',
        keywords: 'توريد الأعمال, الوساطة التجارية, استقطاب الموردين, مقارنة عروض الأسعار, سلاسل الإمداد الرياض, مساند آسر',
        breadcrumbName: 'الرئيسية'
      },
      en: {
        title: 'Musanid Aser | Business Supply & Commercial Brokerage',
        description: 'Musanid Aser provides professional business supply, commercial brokerage, supplier sourcing, and procurement coordination for enterprises in Saudi Arabia.',
        keywords: 'business supply Saudi Arabia, commercial brokerage Riyadh, supplier sourcing KSA, RFQ quotation comparison, procurement coordination',
        breadcrumbName: 'Home'
      }
    },
    'about': {
      ar: {
        title: 'من نحن | مساند آسر للإمداد والوساطة التجارية',
        description: 'تعرف على مؤسسة مساند آسر للإمداد والوساطة التجارية في الرياض: رؤيتنا، منهجيتنا في مساندة الشركات، وقيمنا المرتكزة على الشفافية والاحترافية.',
        keywords: 'عن مساند آسر, مؤسسة وساطة تجارية, حلول الإمداد السعودية, منهجية التوريد',
        breadcrumbName: 'من نحن'
      },
      en: {
        title: 'About Us | Musanid Aser Supply & Brokerage',
        description: 'Learn about Musanid Aser in Riyadh: our approach to empowering businesses through transparent supplier sourcing, quotation comparison, and reliable coordination.',
        keywords: 'about Musanid Aser, Saudi supply brokerage, procurement partner Riyadh, supply chain philosophy',
        breadcrumbName: 'About Us'
      }
    },
    'services': {
      ar: {
        title: 'خدمات توريد الأعمال والوساطة التجارية | مساند آسر',
        description: 'استكشف خدمات مساند آسر: استقطاب الموردين والتحقق من جاهزيتهم، جمع ومقارنة عروض الأسعار، ومتابعة وتنسيق التوريد وفق أعلى معايير الشفافية.',
        keywords: 'خدمات التوريد, الوساطة التجارية بالسعودية, فحص الموردين, مقارنة عروض الأسعار, تنسيق الإمداد',
        breadcrumbName: 'خدماتنا'
      },
      en: {
        title: 'Business Supply & Brokerage Services | Musanid Aser',
        description: 'Discover Musanid Aser services: Verified supplier sourcing, RFQ & quote comparison, and end-to-end supply coordination in Saudi Arabia.',
        keywords: 'supply services Saudi Arabia, supplier verification, RFQ comparison Riyadh, supply coordination',
        breadcrumbName: 'Services'
      }
    },
    'sectors': {
      ar: {
        title: 'القطاعات المستهدفة في التوريد والإمداد | مساند آسر',
        description: 'حلول توريد وإمداد متخصصة لمختلف القطاعات في السعودية: المقاولات والإنشاءات، التشغيل والصيانة، المنشآت التجارية والمكاتب، وتلبية الاحتياجات التشغيلية.',
        keywords: 'توريد المقاولات, إمداد الصيانة والتشغيل, مستلزمات الشركات, توريد المكاتب السعودية',
        breadcrumbName: 'القطاعات'
      },
      en: {
        title: 'Industry Supply Solutions | Musanid Aser',
        description: 'Tailored supply solutions for diverse industries across Saudi Arabia: contracting, construction, facility maintenance, and corporate operational supplies.',
        keywords: 'contracting supply Saudi Arabia, facility procurement Riyadh, corporate supplies, commercial procurement',
        breadcrumbName: 'Sectors'
      }
    },
    'request-quote': {
      ar: {
        title: 'طلب تسعيرة وتواصل معنا | مساند آسر للإمداد',
        description: 'اطلب تسعيرة توريد أو استشر فريق مساند آسر للإمداد والوساطة التجارية. نساعد منشأتك في استقطاب الموردين ومقارنة العروض بدقة وسرعة.',
        keywords: 'طلب تسعيرة توريد, استدراج عروض أسعار, تواصل مع مساند آسر, استشارة توريد تجاري',
        breadcrumbName: 'طلب تسعيرة'
      },
      en: {
        title: 'Request a Quote & Contact Us | Musanid Aser',
        description: 'Submit a request for quotation (RFQ) or consult with Musanid Aser. We assist your enterprise in sourcing suppliers and comparing quotes efficiently.',
        keywords: 'request quote supply KSA, RFQ commercial brokerage, contact Musanid Aser, procurement inquiry',
        breadcrumbName: 'Request a Quote'
      }
    },
    'privacy': {
      ar: {
        title: 'سياسة الخصوصية وحماية البيانات | مساند آسر',
        description: 'سياسة الخصوصية وسرية البيانات لمؤسسة مساند آسر للإمداد والوساطة التجارية وفقاً للأنظمة واللوائح المعتمدة في المملكة العربية السعودية.',
        keywords: 'سياسة الخصوصية مساند آسر, حماية البيانات التجارية, سرية المعلومات',
        breadcrumbName: 'سياسة الخصوصية'
      },
      en: {
        title: 'Privacy Policy & Data Protection | Musanid Aser',
        description: 'Privacy policy and data protection guidelines of Musanid Aser for Supply & Commercial Brokerage in accordance with Saudi Arabian regulations.',
        keywords: 'privacy policy Musanid Aser, data protection Saudi Arabia, confidentiality',
        breadcrumbName: 'Privacy Policy'
      }
    }
  };

  /**
   * Applies all SEO tags, Canonical link, hreflang alternates, and JSON-LD structured data
   * for a given URL path and language.
   */
  updateTags(rawUrl: string): void {
    const cleanUrl = rawUrl.split('?')[0].split('#')[0];
    const isEnglish = cleanUrl === '/en' || cleanUrl.startsWith('/en/');
    const lang: 'ar' | 'en' = isEnglish ? 'en' : 'ar';

    // Normalize route key (e.g., 'services', 'about', or '')
    let routeKey = isEnglish
      ? cleanUrl.replace(/^\/en\/?/, '')
      : cleanUrl.replace(/^\//, '');

    // Normalize trailing slash if any
    routeKey = routeKey.replace(/\/$/, '');

    // Match or fallback to home
    const configGroup = this.seoData[routeKey] || this.seoData[''];
    const pageConfig = configGroup[lang];

    // Build canonical URL
    const canonicalPath = isEnglish
      ? (routeKey ? `/en/${routeKey}` : '/en')
      : (routeKey ? `/${routeKey}` : '/');
    const canonicalUrl = `${this.baseUrl}${canonicalPath}`;

    // Build language alternate URLs
    const arUrl = `${this.baseUrl}${routeKey ? `/${routeKey}` : '/'}`;
    const enUrl = `${this.baseUrl}${routeKey ? `/en/${routeKey}` : '/en'}`;

    // 1. Page Title
    this.titleService.setTitle(pageConfig.title);

    // 2. Standard Meta Tags
    this.metaService.updateTag({ name: 'description', content: pageConfig.description });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    if (pageConfig.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: pageConfig.keywords });
    }

    // 3. Open Graph
    this.metaService.updateTag({ property: 'og:title', content: pageConfig.title });
    this.metaService.updateTag({ property: 'og:description', content: pageConfig.description });
    this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:image', content: `${this.baseUrl}/hero.png` });
    this.metaService.updateTag({ property: 'og:site_name', content: lang === 'ar' ? 'مساند آسر' : 'Musanid Aser' });
    this.metaService.updateTag({ property: 'og:locale', content: lang === 'ar' ? 'ar_SA' : 'en_US' });

    // 4. Twitter Cards
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: pageConfig.title });
    this.metaService.updateTag({ name: 'twitter:description', content: pageConfig.description });
    this.metaService.updateTag({ name: 'twitter:image', content: `${this.baseUrl}/hero.png` });

    // 5. Update Canonical Link
    this.setLinkTag('canonical', canonicalUrl);

    // 6. Update hreflang Alternate Links
    this.setHreflangTag('ar', arUrl);
    this.setHreflangTag('en', enUrl);
    this.setHreflangTag('x-default', arUrl);

    // 7. Inject Structured Data (Schema.org JSON-LD)
    this.updateStructuredData(lang, canonicalUrl, pageConfig, routeKey);
  }

  private setLinkTag(rel: string, href: string): void {
    if (!this.document) return;
    let link: HTMLLinkElement | null = this.document.querySelector(`link[rel='${rel}']`);
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', rel);
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  private setHreflangTag(hreflang: string, href: string): void {
    if (!this.document) return;
    let link: HTMLLinkElement | null = this.document.querySelector(`link[rel='alternate'][hreflang='${hreflang}']`);
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  private updateStructuredData(
    lang: 'ar' | 'en',
    canonicalUrl: string,
    config: PageSeoConfig,
    routeKey: string
  ): void {
    if (!this.document) return;

    const orgName = lang === 'ar'
      ? 'مؤسسة مساند آسر للإمداد والوساطة التجارية'
      : 'Musanid Aser for Supply & Commercial Brokerage';

    const orgDesc = lang === 'ar'
      ? 'مؤسسة مهنية متخصصة في توريد الأعمال والوساطة التجارية واستقطاب الموردين وجمع ومقارنة عروض الأسعار في المملكة العربية السعودية.'
      : 'Musanid Aser provides professional business supply, commercial brokerage, supplier sourcing, and quotation comparison in Saudi Arabia.';

    const schemaGraph: any[] = [
      {
        '@type': 'LocalBusiness',
        '@id': `${this.baseUrl}/#organization`,
        name: orgName,
        alternateName: 'Musanid Aser',
        url: `${this.baseUrl}/`,
        logo: `${this.baseUrl}/logo.png`,
        image: `${this.baseUrl}/hero.png`,
        description: orgDesc,
        telephone: '+966533796523',
        email: 'info@musanidaser.com',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: lang === 'ar' ? 'الرياض' : 'Riyadh',
          addressRegion: lang === 'ar' ? 'منطقة الرياض' : 'Riyadh Region',
          addressCountry: 'SA'
        },
        areaServed: {
          '@type': 'Country',
          name: 'Saudi Arabia'
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${this.baseUrl}/#website`,
        url: `${this.baseUrl}/`,
        name: 'Musanid Aser | مساند آسر',
        publisher: {
          '@id': `${this.baseUrl}/#organization`
        },
        inLanguage: ['ar', 'en']
      }
    ];

    // If subpage, add BreadcrumbList
    if (routeKey) {
      schemaGraph.push({
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: lang === 'ar' ? 'الرئيسية' : 'Home',
            item: lang === 'ar' ? `${this.baseUrl}/` : `${this.baseUrl}/en`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: config.breadcrumbName || config.title,
            item: canonicalUrl
          }
        ]
      });
    }

    const jsonLdContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': schemaGraph
    });

    let scriptTag = this.document.getElementById('musanid-seo-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = this.document.createElement('script');
      scriptTag.id = 'musanid-seo-jsonld';
      scriptTag.type = 'application/ld+json';
      this.document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = jsonLdContent;
    scriptTag.text = jsonLdContent;
  }
}
