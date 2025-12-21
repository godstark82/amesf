import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db, storage, auth } from './firebase';
import { RegistrationWithPaperSchema } from '@/schema/registration-schema';

export interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  affiliation: string;
  country: string;
  category: string;
  daysAttending: string;
  presentingPaper: boolean;
  paperTitle?: string;
  paperAbstract?: string;
  uploadedFile?: File | null;
}

export interface RegistrationResult {
  success: boolean;
  message: string;
  error?: string;
  details?: any;
  userId?: string;
}

export async function registerUser(data: RegistrationData): Promise<RegistrationResult> {
  try {
    // Validate the data
    const validatedData = RegistrationWithPaperSchema.parse(data);

    // Check if auth is available (client-side only)
    if (!auth) {
      return {
        success: false,
        message: 'Registration failed',
        error: 'Authentication service is not available. Please refresh the page.',
      };
    }

    // Create Firebase Auth user
    let userCredential;
    try {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        validatedData.email,
        validatedData.password
      );
    } catch (authError: any) {
      // Handle specific auth errors
      if (authError.code === 'auth/email-already-in-use') {
        return {
          success: false,
          message: 'Registration failed',
          error: 'An account with this email already exists. Please use a different email or try logging in.',
        };
      } else if (authError.code === 'auth/weak-password') {
        return {
          success: false,
          message: 'Registration failed',
          error: 'Password is too weak. Please use a stronger password.',
        };
      } else if (authError.code === 'auth/invalid-email') {
        return {
          success: false,
          message: 'Registration failed',
          error: 'Invalid email address format.',
        };
      }
      throw authError;
    }

    const userId = userCredential.user.uid;

    // Prepare base registration data (no paper submission at registration)
    const registrationData: any = {
      userId,
      fullName: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone,
      affiliation: validatedData.affiliation,
      country: validatedData.country,
      category: validatedData.category,
      daysAttending: validatedData.daysAttending,
      presentingPaper: false, // Papers are submitted later in user panel
      registeredAt: serverTimestamp(),
    };

    // Save all data to a single 'registrations' collection
    await addDoc(collection(db, 'registrations'), registrationData);

    return {
      success: true,
      message: 'Registration successful! You can now log in to your user panel to submit papers and manage your submissions.',
      userId,
    };
  } catch (error: any) {
    console.error('Registration error:', error);

    if (error.name === 'ZodError') {
      return {
        success: false,
        message: 'Validation error',
        error: 'Please check all required fields',
        details: error.errors,
      };
    }

    // Handle Firebase Auth errors
    if (error.code?.startsWith('auth/')) {
      return {
        success: false,
        message: 'Authentication failed',
        error: error.message || 'An authentication error occurred',
      };
    }

    return {
      success: false,
      message: 'Registration failed',
      error: error.message || 'An unexpected error occurred',
    };
  }
}

