import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface Message {
  id?: string;
  clientId: string;
  type: 'email' | 'sms' | 'notification';
  subject?: string;
  content: string;
  status: 'pending' | 'sent' | 'failed';
  sentAt?: Date;
  createdAt: Date;
  userId: string;
}

export interface Template {
  id?: string;
  name: string;
  type: 'email' | 'sms' | 'notification';
  subject?: string;
  content: string;
  variables: string[];
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  // Messages
  getMessages(clientId?: string): Observable<Message[]> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (!user?.uid) return [];
        let query = this.firestore.collection<Message>('messages', ref => 
          ref.where('userId', '==', user.uid)
             .orderBy('createdAt', 'desc')
        );

        if (clientId) {
          query = this.firestore.collection<Message>('messages', ref => 
            ref.where('userId', '==', user.uid)
               .where('clientId', '==', clientId)
               .orderBy('createdAt', 'desc')
          );
        }

        return query.valueChanges({ idField: 'id' });
      })
    );
  }

  async sendMessage(message: Partial<Message>): Promise<string> {
    const user = await this.authService.user$.pipe().toPromise();
    if (!user) throw new Error('User not authenticated');

    const messageData: Message = {
      ...message as Message,
      userId: user.uid,
      status: 'pending',
      createdAt: new Date()
    };

    // In a real application, this would integrate with email/SMS services
    // For now, we'll just store the message and mark it as sent
    const docRef = await this.firestore.collection('messages').add(messageData);
    await this.firestore.collection('messages').doc(docRef.id).update({
      status: 'sent',
      sentAt: new Date()
    });
    
    return docRef.id;
  }

  // Templates
  getTemplates(): Observable<Template[]> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (!user?.uid) return [];
        return this.firestore
          .collection<Template>('templates', ref => 
            ref.where('userId', '==', user.uid))
          .valueChanges({ idField: 'id' });
      })
    );
  }

  async createTemplate(template: Partial<Template>): Promise<string> {
    const user = await this.authService.user$.pipe().toPromise();
    if (!user) throw new Error('User not authenticated');

    const templateData: Template = {
      ...template as Template,
      userId: user.uid
    };

    const docRef = await this.firestore.collection('templates').add(templateData);
    return docRef.id;
  }

  async updateTemplate(templateId: string, updates: Partial<Template>): Promise<void> {
    await this.firestore.collection('templates').doc(templateId).update(updates);
  }

  async deleteTemplate(templateId: string): Promise<void> {
    await this.firestore.collection('templates').doc(templateId).delete();
  }

  // Helper method to replace template variables with actual values
  parseTemplate(template: Template, data: Record<string, string>): string {
    let content = template.content;
    template.variables.forEach(variable => {
      const value = data[variable] || '';
      content = content.replace(new RegExp(`{{${variable}}}`, 'g'), value);
    });
    return content;
  }
}