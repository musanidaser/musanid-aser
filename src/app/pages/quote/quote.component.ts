import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { InternalHeroComponent } from '../../shared/components/internal-hero/internal-hero.component';
import { LanguageService } from '../../core/services/language.service';

/**
 * Web3Forms / Email Submission Service Configuration
 * To enable live email delivery to info@musanidaser.com:
 * 1. Obtain an Access Key from https://web3forms.com
 * 2. Set the key in WEB3FORMS_ACCESS_KEY below.
 */
export const WEB3FORMS_ACCESS_KEY: string = 'a2318250-72df-416b-9c53-bb243add1485';

export interface SubmittedQuoteData {
  referenceId: string;
  organizationName: string;
  contactPerson: string;
  mobileNumber: string;
  email: string;
  requestType: string;
  requestedItem: string;
  quantity: number | string;
  specifications: string;
  approximateBudget?: string;
  requiredDate: string;
  deliveryCity: string;
  additionalDetails?: string;
  date: string;
}

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InternalHeroComponent],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css'
})
export class QuoteComponent {
  langService = inject(LanguageService);
  private fb = inject(FormBuilder);

  quoteForm: FormGroup = this.fb.group({
    organizationName: ['', [Validators.required, Validators.minLength(2)]],
    contactPerson: ['', [Validators.required, Validators.minLength(2)]],
    mobileNumber: [
      '',
      [Validators.required, Validators.pattern(/^[0-9+ ]{8,20}$/)]
    ],
    email: ['', [Validators.required, Validators.email]],
    requestType: ['', [Validators.required]],
    requestedItem: ['', [Validators.required, Validators.minLength(2)]],
    quantity: [null, [Validators.required, Validators.min(1)]],
    specifications: ['', [Validators.required, Validators.minLength(5)]],
    approximateBudget: [''],
    requiredDate: ['', [Validators.required]],
    deliveryCity: ['', [Validators.required, Validators.minLength(2)]],
    additionalDetails: ['']
  });

  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' | 'unconfigured' = 'idle';
  errorMessage: string = '';
  lastSubmittedData: SubmittedQuoteData | null = null;

  get f() {
    return this.quoteForm.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.quoteForm.get(fieldName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  async onSubmit(): Promise<void> {
    if (this.isSubmitting) {
      return;
    }

    if (this.quoteForm.invalid) {
      this.quoteForm.markAllAsTouched();
      this.scrollToFirstInvalidControl();
      return;
    }

    this.isSubmitting = true;
    this.submitStatus = 'idle';
    this.errorMessage = '';

    const formData = this.quoteForm.value;

    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.trim() === '') {
      this.isSubmitting = false;
      this.submitStatus = 'unconfigured';
      return;
    }

    // Generate unique executive reference number
    const referenceId = `MA-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const submissionDate = now.toLocaleString(
      this.langService.currentLang === 'ar' ? 'ar-SA' : 'en-US',
      { dateStyle: 'medium', timeStyle: 'short' }
    );

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `طلب تسعير جديد: ${formData.organizationName} - ${formData.requestedItem} [${referenceId}]`,
          from_name: `منصة مساند آسر (Musanid Aser)`,
          replyto: formData.email,
          botcheck: '',
          // Structured email table keys for instant readability
          'الرقم المرجعي للطلب': referenceId,
          'اسم المنشأة': formData.organizationName,
          'اسم المسؤول': formData.contactPerson,
          'رقم الجوال': formData.mobileNumber,
          'البريد الإلكتروني': formData.email,
          'نوع الطلب': formData.requestType,
          'المنتج أو الخدمة المطلوبة': formData.requestedItem,
          'الكمية': formData.quantity,
          'المواصفات الفنية': formData.specifications,
          'الميزانية التقريبية': formData.approximateBudget?.trim() || 'غير محددة (اختياري)',
          'موعد الاحتياج والتسليم': formData.requiredDate,
          'مدينة التسليم': formData.deliveryCity,
          'تفاصيل وملاحظات إضافية': formData.additionalDetails?.trim() || 'لا توجد ملاحظات إضافية',
          'تاريخ الإرسال': submissionDate
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        this.submitStatus = 'success';
        this.lastSubmittedData = {
          referenceId,
          organizationName: formData.organizationName,
          contactPerson: formData.contactPerson,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
          requestType: formData.requestType,
          requestedItem: formData.requestedItem,
          quantity: formData.quantity,
          specifications: formData.specifications,
          approximateBudget: formData.approximateBudget,
          requiredDate: formData.requiredDate,
          deliveryCity: formData.deliveryCity,
          additionalDetails: formData.additionalDetails,
          date: submissionDate
        };
        this.quoteForm.reset();
        this.scrollToFeedback();
      } else {
        this.submitStatus = 'error';
        this.errorMessage =
          result.message ||
          (this.langService.currentLang === 'ar'
            ? 'تعذر إتمام الإرسال في الوقت الحالي، يرجى المحاولة لاحقاً أو عبر واتساب'
            : 'Error sending quote request. Please retry or contact us via WhatsApp.');
        this.scrollToFeedback();
      }
    } catch (err: any) {
      this.submitStatus = 'error';
      this.errorMessage =
        err?.message ||
        (this.langService.currentLang === 'ar'
          ? 'تعذر الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت'
          : 'Network error occurred while sending your request.');
      this.scrollToFeedback();
    } finally {
      this.isSubmitting = false;
    }
  }

  resetForm(): void {
    this.quoteForm.reset();
    this.submitStatus = 'idle';
    this.errorMessage = '';
    this.lastSubmittedData = null;
    this.scrollToForm();
  }

  private scrollToFeedback(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const anchor = document.getElementById('form-feedback-anchor') || document.getElementById('quote-form-card');
        if (anchor) {
          anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    }
  }

  private scrollToForm(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const anchor = document.getElementById('quote-form-card');
        if (anchor) {
          anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    }
  }

  private scrollToFirstInvalidControl(): void {
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        const firstErrorEl = document.querySelector('.has-field-error');
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 80);
    }
  }
}
