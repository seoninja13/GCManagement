import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Invoice, InvoiceItem } from '../../services/invoice.service';
import { ClientService, Client } from '../../services/client.service';
import { JobService, Job } from '../../services/job.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-backdrop" (click)="close.emit()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>{{ invoice ? 'Edit Invoice' : 'Create Invoice' }}</h2>
          <button class="btn-close" (click)="close.emit()">×</button>
        </div>

        <form [formGroup]="invoiceForm" (ngSubmit)="onSubmit()">
          <div class="form-section">
            <div class="form-group">
              <label class="form-label">Client</label>
              <select formControlName="clientId" class="form-control">
                <option value="">Select a client</option>
                <option *ngFor="let client of clients$ | async" [value]="client.id">
                  {{ client.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Due Date</label>
              <input 
                type="date" 
                formControlName="dueDate"
                class="form-control"
              >
            </div>
          </div>

          <div class="form-section">
            <h3>Items</h3>
            <div formArrayName="items">
              <div *ngFor="let item of items.controls; let i=index" [formGroupName]="i" class="item-row">
                <div class="form-group">
                  <input 
                    type="text" 
                    formControlName="description"
                    class="form-control"
                    placeholder="Description"
                  >
                </div>
                <div class="form-group">
                  <input 
                    type="number" 
                    formControlName="quantity"
                    class="form-control"
                    placeholder="Qty"
                    min="1"
                    (input)="calculateItemAmount(i)"
                  >
                </div>
                <div class="form-group">
                  <input 
                    type="number" 
                    formControlName="rate"
                    class="form-control"
                    placeholder="Rate"
                    min="0"
                    step="0.01"
                    (input)="calculateItemAmount(i)"
                  >
                </div>
                <div class="form-group amount">
                  {{ getItemAmount(i) | currency }}
                </div>
                <button type="button" class="btn-icon" (click)="removeItem(i)">×</button>
              </div>
            </div>
            <button type="button" class="btn btn-secondary" (click)="addItem()">
              Add Item
            </button>
          </div>

          <div class="form-section totals">
            <div class="total-row">
              <span>Subtotal</span>
              <span>{{ subtotal | currency }}</span>
            </div>
            <div class="total-row">
              <span>Tax ({{ taxRate }}%)</span>
              <span>{{ tax | currency }}</span>
            </div>
            <div class="total-row grand-total">
              <span>Total</span>
              <span>{{ total | currency }}</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Notes</label>
            <textarea 
              formControlName="notes"
              class="form-control"
              rows="3"
              placeholder="Additional notes or payment instructions"
            ></textarea>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="close.emit()">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" [disabled]="!invoiceForm.valid">
              {{ invoice ? 'Update Invoice' : 'Create Invoice' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 0.5rem;
      width: 100%;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--gray-200);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .form-section {
      padding: 1.5rem;
      border-bottom: 1px solid var(--gray-200);
    }

    .form-section h3 {
      margin-bottom: 1rem;
      font-size: 1.125rem;
      font-weight: 500;
    }

    .item-row {
      display: grid;
      grid-template-columns: 3fr 1fr 1fr 1fr auto;
      gap: 1rem;
      margin-bottom: 1rem;
      align-items: start;
    }

    .amount {
      padding: 0.5rem;
      background: var(--gray-50);
      border-radius: 0.375rem;
      text-align: right;
    }

    .btn-icon {
      background: none;
      border: none;
      font-size: 1.25rem;
      color: var(--gray-500);
      cursor: pointer;
      padding: 0.5rem;
    }

    .totals {
      background: var(--gray-50);
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
    }

    .grand-total {
      font-weight: 600;
      font-size: 1.125rem;
      border-top: 2px solid var(--gray-300);
      margin-top: 0.5rem;
      padding-top: 1rem;
    }

    .modal-footer {
      padding: 1.5rem;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
  `]
})
export class InvoiceModalComponent implements OnInit {
  @Input() invoice?: Invoice;
  @Output() save = new EventEmitter<Partial<Invoice>>();
  @Output() close = new EventEmitter<void>();

  invoiceForm: FormGroup;
  clients$: Observable<Client[]>;
  jobs$: Observable<Job[]>;
  taxRate = 10; // Example tax rate

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private jobService: JobService
  ) {
    this.clients$ = this.clientService.getClients();
    this.jobs$ = this.jobService.getJobs();

    this.invoiceForm = this.fb.group({
      clientId: ['', Validators.required],
      dueDate: ['', Validators.required],
      items: this.fb.array([]),
      notes: ['']
    });
  }

  ngOnInit() {
    if (this.invoice) {
      this.invoiceForm.patchValue({
        clientId: this.invoice.clientId,
        dueDate: this.formatDate(this.invoice.dueDate),
        notes: this.invoice.notes
      });

      this.invoice.items.forEach(item => this.addItem(item));
    } else {
      this.addItem();
    }
  }

  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(item?: InvoiceItem) {
    this.items.push(this.fb.group({
      description: [item?.description || '', Validators.required],
      quantity: [item?.quantity || 1, [Validators.required, Validators.min(1)]],
      rate: [item?.rate || 0, [Validators.required, Validators.min(0)]],
      amount: [item?.amount || 0]
    }));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  calculateItemAmount(index: number) {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value || 0;
    const rate = item.get('rate')?.value || 0;
    item.patchValue({ amount: quantity * rate }, { emitEvent: false });
  }

  getItemAmount(index: number): number {
    const item = this.items.at(index);
    return item.get('quantity')?.value * item.get('rate')?.value || 0;
  }

  get subtotal(): number {
    return this.items.controls.reduce((sum, item) => {
      return sum + this.getItemAmount(this.items.controls.indexOf(item));
    }, 0);
  }

  get tax(): number {
    return this.subtotal * (this.taxRate / 100);
  }

  get total(): number {
    return this.subtotal + this.tax;
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      const formValue = this.invoiceForm.value;
      const invoiceData: Partial<Invoice> = {
        ...formValue,
        dueDate: new Date(formValue.dueDate),
        subtotal: this.subtotal,
        tax: this.tax,
        total: this.total
      };

      this.save.emit(invoiceData);
    }
  }
}