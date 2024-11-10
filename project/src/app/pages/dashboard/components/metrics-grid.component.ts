import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueMetrics, JobMetrics, ClientMetrics } from '../../../services/analytics.service';

@Component({
  selector: 'app-metrics-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="metrics-grid">
      <div class="metric-card revenue">
        <h3>Revenue</h3>
        <div class="metric-content">
          <div class="metric-item">
            <span class="label">Total Revenue</span>
            <span class="value">{{ revenue?.totalRevenue | currency }}</span>
          </div>
          <div class="metric-item">
            <span class="label">Outstanding</span>
            <span class="value">{{ revenue?.outstandingInvoices | currency }}</span>
          </div>
          <div class="metric-item">
            <span class="label">Average Invoice</span>
            <span class="value">{{ revenue?.averageInvoiceValue | currency }}</span>
          </div>
        </div>
      </div>

      <div class="metric-card jobs">
        <h3>Jobs</h3>
        <div class="metric-content">
          <div class="metric-item">
            <span class="label">Total Jobs</span>
            <span class="value">{{ jobs?.totalJobs }}</span>
          </div>
          <div class="metric-item">
            <span class="label">Completed</span>
            <span class="value">{{ jobs?.completedJobs }}</span>
          </div>
          <div class="metric-item">
            <span class="label">Pending</span>
            <span class="value">{{ jobs?.pendingJobs }}</span>
          </div>
        </div>
      </div>

      <div class="metric-card clients">
        <h3>Clients</h3>
        <div class="metric-content">
          <div class="metric-item">
            <span class="label">Total Clients</span>
            <span class="value">{{ clients?.totalClients }}</span>
          </div>
          <div class="metric-item">
            <span class="label">Active Clients</span>
            <span class="value">{{ clients?.activeClients }}</span>
          </div>
          <div class="metric-item">
            <span class="label">New This Month</span>
            <span class="value">{{ clients?.newClientsThisMonth }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .metric-card {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .metric-card h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--gray-900);
      margin-bottom: 1rem;
    }

    .metric-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .metric-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .label {
      color: var(--gray-600);
      font-size: 0.875rem;
    }

    .value {
      font-weight: 600;
      color: var(--gray-900);
    }

    .revenue {
      border-top: 4px solid #10B981;
    }

    .jobs {
      border-top: 4px solid #3B82F6;
    }

    .clients {
      border-top: 4px solid #8B5CF6;
    }
  `]
})
export class MetricsGridComponent {
  @Input() revenue?: RevenueMetrics;
  @Input() jobs?: JobMetrics;
  @Input() clients?: ClientMetrics;
}