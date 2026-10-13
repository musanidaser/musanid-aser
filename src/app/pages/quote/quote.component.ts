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
export const WEB3FORMS_ACCESS_KEY: string = '';

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

  // Exact 12 fields in specified order:
  // 1. organizationName (Required)
  // 2. contactPerson (Required)
  // 3. mobileNumber (Required)
  // 4. email (Required)
  // 5. requestType (Required)
  // 6. requestedItem (Required)
  // 7. quantity (Required, positive number)
  // 8. specifications (Required)
  // 9. approximateBudget (Optional)
  // 10. requiredDate (Required)
  // 11. deliveryCity (Required)
  // 12. additionalDetails (Optional)
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

  get f() {
    return this.quoteForm.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.quoteForm.get(fieldName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  async onSubmit(): Promise<void> {
    // Prevent duplicate submission while already processing
    if (this.isSubmitting) {
      return;
    }

    if (this.quoteForm.invalid) {
      this.quoteForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitStatus = 'idle';
    this.errorMessage = '';

    const formData = this.quoteForm.value;

    // Check if live Web3Forms access key is configured
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.trim() === '') {
      // Safe frontend handling when email key is pending
      this.isSubmitting = false;
      this.submitStatus = 'unconfigured';
      // Preserve form values (do not clear)
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `طلب عرض سعر جديد: ${formData.organizationName} - ${formData.requestedItem}`,
          organization_name: formData.organizationName,
          contact_person: formData.contactPerson,
          mobile_number: formData.mobileNumber,
          email: formData.email,
          request_type: formData.requestType,
          requested_item: formData.requestedItem,
          quantity: formData.quantity,
          specifications: formData.specifications,
          approximate_budget: formData.approximateBudget || 'غير محدد (اختياري)',
          required_date: formData.requiredDate,
          delivery_city: formData.deliveryCity,
          additional_details: formData.additionalDetails || 'لا يوجد'
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Confirmation only on genuine success
        this.submitStatus = 'success';
        this.quoteForm.reset();
      } else {
        // Clear error status without losing entered data
        this.submitStatus = 'error';
        this.errorMessage = result.message || 'Error sending request';
      }
    } catch (err: any) {
      // On failure, retain all form entries
      this.submitStatus = 'error';
      this.errorMessage = err?.message || 'Network error';
    } finally {
      this.isSubmitting = false;
    }
  }

  resetForm(): void {
    this.quoteForm.reset();
    this.submitStatus = 'idle';
    this.errorMessage = '';
  }

  getWhatsAppPrefilledUrl(): string {
    const v = this.quoteForm.value;
    const isAr = this.langService.currentLang === 'ar';
    const text = isAr
      ? `السلام عليكم، أود تقديم طلب عرض سعر من مؤسسة مساند آسر:\n\n` +
        `• *اسم المنشأة:* ${v.organizationName || '-'}\n` +
        `• *اسم المسؤول:* ${v.contactPerson || '-'}\n` +
        `• *رقم الجوال:* ${v.mobileNumber || '-'}\n` +
        `• *البريد الإلكتروني:* ${v.email || '-'}\n` +
        `• *نوع الطلب:* ${v.requestType || '-'}\n` +
        `• *المنتج أو الخدمة:* ${v.requestedItem || '-'}\n` +
        `• *الكمية:* ${v.quantity || '-'}\n` +
        `• *المواصفات:* ${v.specifications || '-'}\n` +
        `• *الميزانية التقريبية:* ${v.approximateBudget || 'غير محدد'}\n` +
        `• *موعد الاحتياج:* ${v.requiredDate || '-'}\n` +
        `• *مدينة التسليم:* ${v.deliveryCity || '-'}\n` +
        `• *تفاصيل إضافية:* ${v.additionalDetails || 'لا يوجد'}`
      : `Hello, I would like to request a quote from Musanid Aser:\n\n` +
        `• *Organization:* ${v.organizationName || '-'}\n` +
        `• *Contact Person:* ${v.contactPerson || '-'}\n` +
        `• *Mobile:* ${v.mobileNumber || '-'}\n` +
        `• *Email:* ${v.email || '-'}\n` +
        `• *Request Type:* ${v.requestType || '-'}\n` +
        `• *Requested Item:* ${v.requestedItem || '-'}\n` +
        `• *Quantity:* ${v.quantity || '-'}\n` +
        `• *Specifications:* ${v.specifications || '-'}\n` +
        `• *Approx Budget:* ${v.approximateBudget || 'Not specified'}\n` +
        `• *Required Date:* ${v.requiredDate || '-'}\n` +
        `• *Delivery City:* ${v.deliveryCity || '-'}\n` +
        `• *Additional Details:* ${v.additionalDetails || 'None'}`;

    return `https://wa.me/966533796523?text=${encodeURIComponent(text)}`;
  }
}
