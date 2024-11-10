import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    // Test write operation
    const testCollection = collection(db, 'test');
    await addDoc(testCollection, {
      message: 'Firebase connection test',
      timestamp: new Date().toISOString()
    });

    // Test read operation
    const querySnapshot = await getDocs(testCollection);
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      success: true,
      message: 'Firebase connection successful',
      data: documents
    });
  } catch (error) {
    console.error('Firebase test failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Firebase connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}