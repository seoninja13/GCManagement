import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClientService, Client } from '../../services/client.service';
import { ClientCommunicationComponent } from './client-communication.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [
    CommonModule,
    ClientCommunicationComponent
  ],
  template: `
    <div class="page-container">
      <ng-container *ngIf="client$ | async as client">
        <div class="page-header">
          <h1>{{ client.name }}</h1>
          <button class="btn btn-primary" (click)="editClient(client)">
            Edit Client
          </button>
        </div>

        <div class="client-details">
          <section class="content-section">
            <h2>Contact Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <label>Email</label>
                <p>{{ client.email }}</p>
              </div>
              <div class="info-item">
                <label>Phone</label>
                <p>{{ client.phone }}</p>
              </div>
              <div class="info-item">
                <label>Address</label>
                <p>{{ client.address }}</p>
              </div>
            </div>
          </section>

          <section class="content-section">
            <app-client-communication 
              [client]="client"
            ></app-client-communication>
          </section>
        </div>
      </ng-container>
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

    .client-details {
      display: grid;
      gap: 2rem;
    }

    .content-section {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .content-section h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--gray-900);
      margin-bottom: 1.5rem;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .info-item label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--gray-600);
      margin-bottom: 0.5rem;
    }

    .info-item p {
      color: var(--gray-900);
    }
  `]
})
export class ClientDetailComponent implements OnInit {
  client$: Observable<Client>;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {
    const clientId = this.route.snapshot.paramMap.get('id');
    this.client$ = this.clientService.getClientById(clientId!).pipe(
      map(client => {
        if (!client) throw new Error('Client not found');
        return client;
      })
    );
  }

  ngOnInit() {}

  editClient(client: Client) {
    // Implement edit functionality
  }
}