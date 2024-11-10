import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id?: string;
  invoiceNumber: string;
  clientId: string;
  jobId?: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  getInvoices(): Observable<Invoice[]> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (!user?.uid) return [];
        return this.firestore
          .collection<Invoice>('invoices', ref => 
            ref.where('userId', '==', user.uid)
               .orderBy('createdAt', 'desc'))
          .valueChanges({ idField: 'id' });
      })
    );
  }

  async createInvoice(invoice: Partial<Invoice>): Promise<string> {
    const user = await this.authService.user$.pipe(map(u => u?.uid)).toPromise();
    if (!user) throw new Error('User not authenticated');

    const lastInvoice = await this.firestore
      .collection<Invoice>('invoices', ref => 
        ref.where('userId', '==', user)
           .orderBy('invoiceNumber', 'desc')
           .limit(1))
      .get()
      .toPromise();

    const lastNumber = lastInvoice?.docs[0]?.data()?.invoiceNumber ?? 'INV-0000';
    const nextNumber = this.generateNextInvoiceNumber(lastNumber);

    const invoiceData: Invoice = {
      ...invoice as Invoice,
      invoiceNumber: nextNumber,
      userId: user,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft'
    };

    const docRef = await this.firestore.collection('invoices').add(invoiceData);
    return docRef.id;
  }

  updateInvoice(invoiceId: string, updates: Partial<Invoice>): Promise<void> {
    return this.firestore.collection('invoices').doc(invoiceId).update({
      ...updates,
      updatedAt: new Date()
    });
  }

  deleteInvoice(invoiceId: string): Promise<void> {
    return this.firestore.collection('invoices').doc(invoiceId).delete();
  }

  getInvoiceById(invoiceId: string): Observable<Invoice | undefined> {
    return this.firestore
      .collection('invoices')
      .doc<Invoice>(invoiceId)
      .valueChanges();
  }

  private generateNextInvoiceNumber(lastNumber: string): string {
    const number = parseInt(lastNumber.split('-')[1]);
    return `INV-${String(number + 1).padStart(4, '0')}`;
  }

  async markAsPaid(invoiceId: string): Promise<void> {
    return this.updateInvoice(invoiceId, {
      status: 'paid',
      updatedAt: new Date()
    });
  }

  async sendInvoice(invoiceId: string): Promise<void> {
    return this.updateInvoice(invoiceId, {
      status: 'sent',
      updatedAt: new Date()
    });
  }
}