import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { JobService } from './job.service';
import { InvoiceService } from './invoice.service';
import { ClientService } from './client.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export interface RevenueMetrics {
  totalRevenue: number;
  paidInvoices: number;
  outstandingInvoices: number;
  averageInvoiceValue: number;
}

export interface JobMetrics {
  totalJobs: number;
  completedJobs: number;
  pendingJobs: number;
  averageJobDuration: number;
}

export interface ClientMetrics {
  totalClients: number;
  activeClients: number;
  newClientsThisMonth: number;
  averageRevenuePerClient: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private jobService: JobService,
    private invoiceService: InvoiceService,
    private clientService: ClientService
  ) {}

  getRevenueMetrics(): Observable<RevenueMetrics> {
    return this.invoiceService.getInvoices().pipe(
      map(invoices => {
        const total = invoices.reduce((sum, inv) => sum + inv.total, 0);
        const paid = invoices.filter(inv => inv.status === 'paid');
        const outstanding = invoices.filter(inv => inv.status === 'sent' || inv.status === 'overdue');

        return {
          totalRevenue: total,
          paidInvoices: paid.reduce((sum, inv) => sum + inv.total, 0),
          outstandingInvoices: outstanding.reduce((sum, inv) => sum + inv.total, 0),
          averageInvoiceValue: total / (invoices.length || 1)
        };
      })
    );
  }

  getJobMetrics(): Observable<JobMetrics> {
    return this.jobService.getJobs().pipe(
      map(jobs => {
        const completed = jobs.filter(job => job.status === 'completed');
        const pending = jobs.filter(job => job.status === 'pending' || job.status === 'scheduled');

        return {
          totalJobs: jobs.length,
          completedJobs: completed.length,
          pendingJobs: pending.length,
          averageJobDuration: this.calculateAverageJobDuration(completed)
        };
      })
    );
  }

  getClientMetrics(): Observable<ClientMetrics> {
    return combineLatest([
      this.clientService.getClients(),
      this.invoiceService.getInvoices()
    ]).pipe(
      map(([clients, invoices]) => {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const newClients = clients.filter(client => 
          new Date(client.createdAt) >= monthStart
        );

        const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);

        return {
          totalClients: clients.length,
          activeClients: this.getActiveClientsCount(clients, invoices),
          newClientsThisMonth: newClients.length,
          averageRevenuePerClient: totalRevenue / (clients.length || 1)
        };
      })
    );
  }

  private calculateAverageJobDuration(jobs: any[]): number {
    if (!jobs.length) return 0;
    const durations = jobs.map(job => {
      const start = new Date(job.createdAt);
      const end = new Date(job.updatedAt);
      return (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Hours
    });
    return durations.reduce((sum, duration) => sum + duration, 0) / jobs.length;
  }

  private getActiveClientsCount(clients: any[], invoices: any[]): number {
    const now = new Date();
    const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
    
    const activeClientIds = new Set(
      invoices
        .filter(inv => new Date(inv.createdAt) >= threeMonthsAgo)
        .map(inv => inv.clientId)
    );

    return activeClientIds.size;
  }
}