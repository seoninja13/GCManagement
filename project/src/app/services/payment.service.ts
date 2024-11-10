import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {
    this.initStripe();
  }

  private async initStripe() {
    this.stripe = await loadStripe(environment.stripe.publicKey);
  }

  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<string> {
    const user = await this.authService.user$.pipe().toPromise();
    if (!user) throw new Error('User not authenticated');

    const docRef = await this.firestore.collection('payment_intents').add({
      amount,
      currency,
      userId: user.uid,
      status: 'pending',
      createdAt: new Date()
    });

    // In a real application, this would call your backend API
    // which would create the payment intent using the Stripe API
    return docRef.id;
  }

  async attachPaymentMethod(paymentMethodId: string): Promise<void> {
    const user = await this.authService.user$.pipe().toPromise();
    if (!user) throw new Error('User not authenticated');

    await this.firestore.collection('users').doc(user.uid).collection('payment_methods').add({
      paymentMethodId,
      createdAt: new Date()
    });
  }

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const user = await this.authService.user$.pipe().toPromise();
    if (!user) throw new Error('User not authenticated');

    const snapshot = await this.firestore
      .collection('users')
      .doc(user.uid)
      .collection('payment_methods')
      .get()
      .toPromise();

    return snapshot?.docs.map(doc => doc.data() as PaymentMethod) ?? [];
  }

  async createPaymentElement(elementId: string): Promise<void> {
    if (!this.stripe) throw new Error('Stripe not initialized');

    const elements = this.stripe.elements();
    const paymentElement = elements.create('payment');
    paymentElement.mount(`#${elementId}`);
    this.elements = elements;
  }

  async processPayment(paymentIntentId: string): Promise<{ success: boolean; error?: string }> {
    if (!this.stripe || !this.elements) {
      throw new Error('Stripe not initialized');
    }

    try {
      const { error } = await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }
}