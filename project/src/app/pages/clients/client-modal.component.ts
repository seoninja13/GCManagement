import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Client } from '../../services/client.service';

@Component({
  selector: 'app-client-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-backdrop" (click)="close.emit()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>{{ client ? 'Edit Client' : 'Add New Client' }}</h2>
          <button class="btn-close" (click)="close.emit()">×</button>
        </div>

        <form [formGroup]="clientForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="form-label">Name</label>
            <input 
              type="text" 
              formControlName="name"
              class="form-control"
              [class.error]="clientForm.get('name')?.touched && clientForm.get('name')?.invalid"
            >
          </div>

          <div class="form-group">
            <label class="form-label">Email</label>
            <input 
              type="email" 
              formControlName="email"
              class="form-control"
              [class.error]="clientForm.get('email')?.touched && clientForm.get('email')?.invalid"
            >
          </div>

          <div class="form-group">
            <label class="form-label">Phone</label>
            <input 
              type="tel" 
              formControlName="phone"
              class="form-control"
              [class.error]="clientForm.get('phone')?.touched && clientForm.get('phone')?.invalid"
            >
          </div>

          <div class="form-group">
            <label class="form-label">Address</label>
            <textarea 
              formControlName="address"
              class="form-control"
              rows="2"
              [class.error]="clientForm.get('address')?.touched && clientForm.get('address')?.invalid"
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Notes</label>
            <textarea 
              formControlName="notes"
              class="form-control"
              rows="3"
            ></textarea>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="close.emit()">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" [disabled]="clientForm.invalid || isLoading">
              {{ isLoading ? 'Saving...' : (client ? 'Update Client' : 'Add Client') }}
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
      max-width: 500px;
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

    .modal-header h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--gray-900);
    }

    .btn-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--gray-500);
    }

    form {
      padding: 1.5rem;
    }

    .modal-footer {
      padding-top: 1.5rem;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
  `]
})
export class ClientModalComponent {
  @Input() client?: Client;
  @Output() save = new EventEmitter<Partial<Client>>();
  @Output() close = new EventEmitter<void>();

  clientForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      notes: ['']
    });

    if (this.client) {
      this.clientForm.patchValue(this.client);
    }
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.isLoading = true;
      this.save.emit(this.clientForm.value);
    }
  }
}