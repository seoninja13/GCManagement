import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService, Invoice } from '../../services/invoice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Invoice {{ (invoice$ | async)?.invoiceNumber }}</h1>
        <div class="header-actions">
          <button class="btn btn-secondary" (click)="downloadPdf()">Download PDF</button>
          <button class="btn btn-primary" (click)="sendInvoice()">Send Invoice</button>
        </div>
      </div>

      <div class="invoice-content" *ngIf="invoice$ | async as invoice">
        <div class="invoice-details">
          <div class="invoice-info">
            <h3>Invoice Details</h3>
            <p><strong>Invoice Number:</strong> {{ invoice.invoiceNumber }}</p>
            <p><strong>Date:</strong> {{ invoice.createdAt | date }}</p>
            <p><strong>Due Date:</strong> {{ invoice.dueDate | date }}</p>
            <p><strong>Status:</strong> {{ invoice.status }}</p>
          </div>

          <div class="invoice-items">
            <h3>Items</h3>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of invoice.items">
                  <td>{{ item.description }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.rate | currency }}</td>
                  <td>{{ item.amount | currency }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3">Subtotal</td>
                  <td>{{ invoice.subtotal | currency }}</td>
                </tr>
                <tr>
                  <td colspan="3">Tax</td>
                  <td>{{ invoice.tax | currency }}</td>
                </tr>
                <tr class="total">
                  <td colspan="3">Total</td>
                  <td>{{ invoice.total | currency }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
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

    .header-actions {
      display: flex;
      gap: 1rem;
    }

    .invoice-details {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      padding: 2rem;
    }

    .invoice-info {
      margin-bottom: 2rem;
    }

    .invoice-info h3 {
      margin-bottom: 1rem;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .invoice-info p {
      margin-bottom: 0.5rem;
    }

    .invoice-items h3 {
      margin-bottom: 1rem;
      font-size: 1.25rem;
      font-weight: 600;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid var(--gray-200);
    }

    th {
      font-weight: 500;
      color: var(--gray-600);
      background: var(--gray-50);
    }

    tfoot tr {
      font-weight: 500;
    }

    tfoot tr.total {
      font-weight: 600;
      font-size: 1.125rem;
    }
  `]
})
export class InvoiceDetailComponent implements OnInit {
  invoice$: Observable<Invoice | undefined>;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {
    const invoiceId = this.route.snapshot.paramMap.get('id');
    this.invoice$ = this.invoiceService.getInvoiceById(invoiceId!);
  }

  ngOnInit() {}

  downloadPdf() {
    // Implement PDF download
  }

  sendInvoice() {
    // Implement invoice sending
  }
}