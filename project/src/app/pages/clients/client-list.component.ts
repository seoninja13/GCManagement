import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientService, Client } from '../../services/client.service';
import { Observable } from 'rxjs';
import { ClientModalComponent } from './client-modal.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ClientModalComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Clients</h1>
        <button class="btn btn-primary" (click)="showClientModal = true">
          Add Client
        </button>
      </div>

      <div class="search-bar">
        <input 
          type="text" 
          placeholder="Search clients..." 
          class="search-input"
          (input)="onSearch($event)"
        >
      </div>

      <div class="client-grid">
        <div *ngFor="let client of clients$ | async" class="client-card">
          <div class="client-header">
            <h3>{{ client.name }}</h3>
            <div class="client-actions">
              <button class="btn-icon" (click)="editClient(client)">✏️</button>
              <button class="btn-icon" (click)="deleteClient(client)">🗑️</button>
            </div>
          </div>
          
          <div class="client-info">
            <p><strong>Email:</strong> {{ client.email }}</p>
            <p><strong>Phone:</strong> {{ client.phone }}</p>
            <p><strong>Address:</strong> {{ client.address }}</p>
          </div>

          <div class="client-footer">
            <button class="btn btn-secondary" (click)="createJob(client)">
              Create Job
            </button>
            <button class="btn btn-secondary" [routerLink]="['/clients', client.id]">
              View Details
            </button>
          </div>
        </div>

        <div *ngIf="!(clients$ | async)?.length" class="empty-state">
          <p>No clients found. Add your first client to get started.</p>
        </div>
      </div>
    </div>

    <app-client-modal
      *ngIf="showClientModal"
      [client]="selectedClient"
      (save)="saveClient($event)"
      (close)="closeClientModal()"
    ></app-client-modal>
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

    .page-header h1 {
      font-size: 1.875rem;
      font-weight: 600;
      color: var(--gray-900);
    }

    .search-bar {
      margin-bottom: 2rem;
    }

    .search-input {
      width: 100%;
      max-width: 400px;
      padding: 0.75rem;
      border: 1px solid var(--gray-200);
      border-radius: 0.375rem;
      font-size: 1rem;
    }

    .client-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .client-card {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
    }

    .client-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 1rem;
    }

    .client-header h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--gray-900);
    }

    .client-actions {
      display: flex;
      gap: 0.5rem;
    }

    .client-info {
      margin-bottom: 1.5rem;
    }

    .client-info p {
      margin-bottom: 0.5rem;
      color: var(--gray-600);
    }

    .client-footer {
      display: flex;
      gap: 1rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: var(--gray-500);
      grid-column: 1 / -1;
    }
  `]
})
export class ClientListComponent implements OnInit {
  clients$: Observable<Client[]>;
  showClientModal = false;
  selectedClient?: Client;

  constructor(private clientService: ClientService) {
    this.clients$ = this.clientService.getClients();
  }

  ngOnInit() {}

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    // Implement client search
  }

  async saveClient(clientData: Partial<Client>) {
    try {
      if (this.selectedClient) {
        await this.clientService.updateClient(this.selectedClient.id!, clientData);
      } else {
        await this.clientService.createClient(clientData);
      }
      this.closeClientModal();
    } catch (error) {
      console.error('Error saving client:', error);
    }
  }

  editClient(client: Client) {
    this.selectedClient = client;
    this.showClientModal = true;
  }

  async deleteClient(client: Client) {
    if (confirm('Are you sure you want to delete this client?')) {
      try {
        await this.clientService.deleteClient(client.id!);
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  }

  createJob(client: Client) {
    // Implement job creation for client
  }

  closeClientModal() {
    this.showClientModal = false;
    this.selectedClient = undefined;
  }
}