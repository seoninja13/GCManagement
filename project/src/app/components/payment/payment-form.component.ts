import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PaymentService, PaymentMethod } from '../../services/payment.service';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="payment-form">
      <div class="saved-methods" *ngIf="savedMethods.length > 0">
        <h4>Saved Payment Methods</h4>
        <div class="methods-list">
          <div 
            *ngFor="let method of savedMethods" 
            class="payment-method"
            (click)="selectPaymentMethod(method)"
            [class.selected]="selectedMethod?.id === method.id"
          >
            <div class="card-info">
              <span class="card-brand">{{ method.card?.brand }}</span>
              <span class="card-number">•••• {{ method.card?.last4 }}</span>
            </div>
            <div class="card-expiry">
              {{ method.card?.expMonth }}/{{ method.card?.expYear }}
            </div>
          </div>
        </div>
      </div>

      <div class="new-payment-method">
        <h4>Add New Payment Method</h4>
        <div id="payment-element"></div>
      </div>

      <div class="payment-actions">
        <button 
          type="button" 
          class="btn btn-secondary" 
          (click)="cancel.emit()"
        >
          Cancel
        </button>
        <button 
          type="button" 
          class="btn btn-primary" 
          [disabled]="processing"
          (click)="processPayment()"
        >
          {{ processing ? 'Processing...' : 'Pay ' + (amount | currency) }}
        </button>
      </div>

      <div class="error-message" *ngIf="error">
        {{ error }}
      </div>
    </div>
  `,
  styles: [`
    .payment-form {
      padding: 1.5rem;
    }

    .saved-methods {
      margin-bottom: 2rem;
    }

    h4 {
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 1rem;
      color: var(--gray-900);
    }

    .methods-list {
      display: grid;
      gap: 1rem;
    }

    .payment-method {
      border: 1px solid var(--gray-200);
      border-radius: 0.375rem;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .payment-method:hover {
      border-color: var(--primary);
    }

    .payment-method.selected {
      border-color: var(--primary);
      background-color: var(--light);
    }

    .card-info {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .card-brand {
      font-weight: 500;
      text-transform: capitalize;
    }

    .card-expiry {
      font-size: 0.875rem;
      color: var(--gray-600);
    }

    .new-payment-method {
      margin-bottom: 2rem;
    }

    #payment-element {
      min-height: 100px;
    }

    .payment-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }

    .error-message {
      color: #DC2626;
      margin-top: 1rem;
      font-size: 0.875rem;
    }
  `]
})
export class PaymentFormComponent {
  @Input() amount: number = 0;
  @Output() success = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  savedMethods: PaymentMethod[] = [];
  selectedMethod?: PaymentMethod;
  processing = false;
  error?: string;

  constructor(private paymentService: PaymentService) {}

  async ngOnInit() {
    try {
      this.savedMethods = await this.paymentService.getPaymentMethods();
      await this.paymentService.createPaymentElement('payment-element');
    } catch (err: any) {
      this.error = err.message;
    }
  }

  selectPaymentMethod(method: PaymentMethod) {
    this.selectedMethod = method;
  }

  async processPayment() {
    this.processing = true;
    this.error = undefined;

    try {
      const paymentIntentId = await this.paymentService.createPaymentIntent(this.amount);
      const result = await this.paymentService.processPayment(paymentIntentId);

      if (result.success) {
        this.success.emit();
      } else {
        this.error = result.error;
      }
    } catch (err: any) {
      this.error = err.message;
    } finally {
      this.processing = false;
    }
  }
}