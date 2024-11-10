import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-container">
      <div class="chart-header">
        <h3>Performance Overview</h3>
        <div class="chart-legend">
          <span class="legend-item">
            <span class="legend-color revenue"></span>
            Revenue
          </span>
          <span class="legend-item">
            <span class="legend-color jobs"></span>
            Jobs
          </span>
        </div>
      </div>
      
      <div class="chart">
        <canvas #chartCanvas></canvas>
      </div>
    </div>
  `,
  styles: [`
    .chart-container {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .chart-header h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--gray-900);
    }

    .chart-legend {
      display: flex;
      gap: 1rem;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--gray-600);
    }

    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }

    .legend-color.revenue {
      background-color: #10B981;
    }

    .legend-color.jobs {
      background-color: #3B82F6;
    }

    .chart {
      height: 300px;
    }
  `]
})
export class PerformanceChartComponent implements OnChanges {
  @Input() data: any;

  ngOnChanges() {
    // Implement chart rendering using Chart.js or similar
  }
}