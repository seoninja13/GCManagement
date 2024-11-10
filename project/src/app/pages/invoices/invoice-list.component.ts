import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InvoiceService, Invoice } from '../../services/invoice.service';
import { ClientService } from '../../services/client.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvoiceModalComponent } from './invoice-modal.component';

interface InvoiceWithClient extends Invoice {
  clientName?: string;
}

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, RouterModule, InvoiceModalComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Invoices</h1>
        <button class="btn btn-primary" (click)="showInvoiceModal = true">
          Create Invoice
        </button>
      </div>

      <div class="filters">
        <div class="search-bar">
          <input 
            type="text" 
            placeholder="Search invoices..." 
            class="search-input"
            (input)="onSearch($event)"
          >
        </div>
        <select class="select-filter" (change)="onStatusFilter($event)">
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <div class="invoice-table">
        <table>
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Client</th>
              <th>Date</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let invoice of invoices$ | async">
              <td>
                <a [routerLink]="['/invoices', invoice.id]" class="invoice-link">
                  {{ invoice.invoiceNumber }}
                </a>
              </td>
              <td>{{ invoice.clientName }}</td>
              <td>{{ invoice.createdAt | date }}</td>
              <td>{{ invoice.dueDate | date }}</td>
              <td>{{ invoice.total | currency }}</td>
              <td>
                <span class="status-badge" [class]="invoice.status">
                  {{ invoice.status }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button 
                    class="btn btn-secondary btn-sm" 
                    (click)="editInvoice(invoice)"
                  >
                    Edit
                  </button>
                  <button 
                    *ngIf="invoice.status === 'draft'"
                    class="btn btn-primary btn-sm" 
                    (click)="sendInvoice(invoice)"
                  >
                    Send
                  </button>
                  <button 
                    *ngIf="invoice.status === 'sent'"
                    class="btn btn-success btn-sm" 
                    (click)="markAsPaid(invoice)"
                  >
                    Mark Paid
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <app-invoice-modal
      *ngIf="showInvoiceModal"
      [invoice]="selectedInvoice"
      (save)="saveInvoice($event)"
      (close)="closeInvoiceModal()"
    ></app-invoice-modal>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .search-input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid var(--gray-200);
      border-radius: 0.375rem;
    }

    .select-filter {
      padding: 0.5rem;
      border: 1px solid var(--gray-200);
      border-radius: 0.375rem;
      min-width: 150px;
    }

    .invoice-table {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid var(--gray-200);
    }

    th {
      background: var(--gray-50);
      font-weight: 500;
      color: var(--gray-600);
    }

    .invoice-link {
      color: var(--primary);
      text-decoration: none;
      font-weight: 500;
    }

    .invoice-link:hover {
      text-decoration: underline;
    }

    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .status-badge.draft {
      background: var(--gray-100);
      color: var(--gray-700);
    }

    .status-badge.sent {
      background: #DBEAFE;
      color: #1E40AF;
    }

    .status-badge.paid {
      background: #D1FAE5;
      color: #065F46;
    }

    .status-badge.overdue {
      background: #FEE2E2;
      color: #991B1B;
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
    }
  `]
})
export class InvoiceListComponent implements OnInit {
  invoices$: Observable<InvoiceWithClient[]>;
  showInvoiceModal = false;
  selectedInvoice?: Invoice;

  constructor(
    private invoiceService: InvoiceService,
    private clientService: ClientService
  ) {
    const invoices$ = this.invoiceService.getInvoices();
    const clients$ = this.clientService.getClients();

    this.invoices$ = combineLatest([invoices$, clients$]).pipe(
      map(([invoices, clients]) => {
        return invoices.map(invoice => ({
          ...invoice,
          clientName: clients.find(c => c.id === invoice.clientId)?.name
        }));
      })
    );
  }

  ngOnInit() {}

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    // Implement invoice search
  }

  onStatusFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    // Implement status filtering
  }

  async saveInvoice(invoiceData: Partial<Invoice>) {
    try {
      if (this.selectedInvoice) {
        await this.invoiceService.updateInvoice(this.selectedInvoice.id!, invoiceData);
      } else {
        await this.invoiceService.createInvoice(invoiceData);
      }
      this.closeInvoiceModal();
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  }

  editInvoice(invoice: Invoice) {
    this.selectedInvoice = invoice;
    this.showInvoiceModal = true;
  }

  async sendInvoice(invoice: Invoice) {
    try {
      await this.invoiceService.sendInvoice(invoice.id!);
    } catch (error) {
      console.error('Error sending invoice:', error);
    }
  }

  async markAsPaid(invoice: Invoice) {
    try {
      await this.invoiceService.markAsPaid(invoice.id!);
    } catch (error) {
      console.error('Error marking invoice as paid:', error);
    }
  }

  closeInvoiceModal() {
    this.showInvoiceModal = false;
    this.selectedInvoice = undefined;
  }
}