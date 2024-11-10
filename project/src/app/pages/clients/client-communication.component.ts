import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommunicationService, Message, Template } from '../../services/communication.service';
import { Client } from '../../services/client.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-communication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="communication-panel">
      <div class="panel-header">
        <h3>Communication</h3>
        <div class="header-actions">
          <button class="btn btn-secondary" (click)="showTemplates = !showTemplates">
            Templates
          </button>
          <button class="btn btn-primary" (click)="showNewMessage = true">
            New Message
          </button>
        </div>
      </div>

      <div class="message-history" *ngIf="!showTemplates && !showNewMessage">
        <div *ngFor="let message of messages$ | async" class="message-item">
          <div class="message-header">
            <span class="message-type" [class]="message.type">
              {{ message.type }}
            </span>
            <span class="message-date">
              {{ message.sentAt | date:'short' }}
            </span>
          </div>
          <div class="message-content">
            <p *ngIf="message.subject" class="message-subject">
              {{ message.subject }}
            </p>
            <p>{{ message.content }}</p>
          </div>
          <div class="message-status" [class]="message.status">
            {{ message.status }}
          </div>
        </div>

        <div *ngIf="!(messages$ | async)?.length" class="empty-state">
          No messages yet
        </div>
      </div>

      <div class="templates-list" *ngIf="showTemplates">
        <div *ngFor="let template of templates$ | async" class="template-item">
          <div class="template-header">
            <h4>{{ template.name }}</h4>
            <span class="template-type" [class]="template.type">
              {{ template.type }}
            </span>
          </div>
          <p class="template-preview">{{ template.content }}</p>
          <div class="template-actions">
            <button class="btn btn-secondary btn-sm" (click)="useTemplate(template)">
              Use Template
            </button>
            <button class="btn btn-secondary btn-sm" (click)="editTemplate(template)">
              Edit
            </button>
          </div>
        </div>

        <button class="btn btn-secondary" (click)="showNewTemplate = true">
          Create Template
        </button>
      </div>

      <form *ngIf="showNewMessage" [formGroup]="messageForm" (ngSubmit)="sendMessage()">
        <div class="form-group">
          <label class="form-label">Type</label>
          <select formControlName="type" class="form-control">
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="notification">Notification</option>
          </select>
        </div>

        <div class="form-group" *ngIf="messageForm.get('type')?.value === 'email'">
          <label class="form-label">Subject</label>
          <input type="text" formControlName="subject" class="form-control">
        </div>

        <div class="form-group">
          <label class="form-label">Message</label>
          <textarea 
            formControlName="content" 
            class="form-control" 
            rows="4"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" (click)="cancelMessage()">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary" [disabled]="!messageForm.valid">
            Send Message
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .communication-panel {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .panel-header {
      padding: 1rem;
      border-bottom: 1px solid var(--gray-200);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-actions {
      display: flex;
      gap: 0.5rem;
    }

    .message-history {
      padding: 1rem;
    }

    .message-item {
      border: 1px solid var(--gray-200);
      border-radius: 0.375rem;
      padding: 1rem;
      margin-bottom: 1rem;
    }

    .message-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .message-type {
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .message-type.email {
      background: #DBEAFE;
      color: #1E40AF;
    }

    .message-type.sms {
      background: #D1FAE5;
      color: #065F46;
    }

    .message-type.notification {
      background: #FEF3C7;
      color: #92400E;
    }

    .message-date {
      font-size: 0.875rem;
      color: var(--gray-500);
    }

    .message-subject {
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .message-status {
      margin-top: 0.5rem;
      font-size: 0.875rem;
      text-align: right;
    }

    .message-status.sent {
      color: #059669;
    }

    .message-status.failed {
      color: #DC2626;
    }

    .message-status.pending {
      color: #D97706;
    }

    .templates-list {
      padding: 1rem;
    }

    .template-item {
      border: 1px solid var(--gray-200);
      border-radius: 0.375rem;
      padding: 1rem;
      margin-bottom: 1rem;
    }

    .template-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .template-preview {
      color: var(--gray-600);
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .template-actions {
      display: flex;
      gap: 0.5rem;
    }

    .empty-state {
      text-align: center;
      padding: 2rem;
      color: var(--gray-500);
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
    }
  `]
})
export class ClientCommunicationComponent {
  @Input() client!: Client;

  messages$: Observable<Message[]>;
  templates$: Observable<Template[]>;
  messageForm: FormGroup;
  showTemplates = false;
  showNewMessage = false;
  showNewTemplate = false;

  constructor(
    private fb: FormBuilder,
    private communicationService: CommunicationService
  ) {
    this.messageForm = this.fb.group({
      type: ['email', Validators.required],
      subject: [''],
      content: ['', Validators.required]
    });

    this.messages$ = this.communicationService.getMessages(this.client?.id);
    this.templates$ = this.communicationService.getTemplates();
  }

  async sendMessage() {
    if (this.messageForm.valid) {
      try {
        await this.communicationService.sendMessage({
          ...this.messageForm.value,
          clientId: this.client.id
        });
        this.showNewMessage = false;
        this.messageForm.reset({ type: 'email' });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }

  useTemplate(template: Template) {
    const parsedContent = this.communicationService.parseTemplate(template, {
      clientName: this.client.name,
      clientEmail: this.client.email,
      clientPhone: this.client.phone
    });

    this.messageForm.patchValue({
      type: template.type,
      subject: template.subject,
      content: parsedContent
    });

    this.showTemplates = false;
    this.showNewMessage = true;
  }

  editTemplate(template: Template) {
    // Implement template editing
  }

  cancelMessage() {
    this.showNewMessage = false;
    this.messageForm.reset({ type: 'email' });
  }
}