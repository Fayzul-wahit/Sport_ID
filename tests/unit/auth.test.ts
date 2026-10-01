import { describe, it, expect } from 'vitest';
import { contactSchema, otpSchema } from '@/lib/validations/auth';

describe('M1 Auth & Validation Unit Tests', () => {
  it('should validate valid email and phone inputs', () => {
    const validEmail = contactSchema.safeParse({ contact: 'athlete@example.com', role: 'athlete' });
    const validPhone = contactSchema.safeParse({ contact: '+919876543210', role: 'athlete' });
    const invalidContact = contactSchema.safeParse({ contact: 'a', role: 'athlete' });

    expect(validEmail.success).toBe(true);
    expect(validPhone.success).toBe(true);
    expect(invalidContact.success).toBe(false);
  });

  it('should validate 6-digit OTP code', () => {
    const validOtp = otpSchema.safeParse({
      contact: 'athlete@example.com',
      otp: '123456',
      role: 'athlete',
      language: 'en',
    });

    const invalidOtp = otpSchema.safeParse({
      contact: 'athlete@example.com',
      otp: '123',
      role: 'athlete',
      language: 'en',
    });

    expect(validOtp.success).toBe(true);
    expect(invalidOtp.success).toBe(false);
  });

  it('should enforce user role choices (athlete or org_rep)', () => {
    const validRole = contactSchema.safeParse({ contact: 'org@example.com', role: 'org_rep' });
    const invalidRole = contactSchema.safeParse({ contact: 'org@example.com', role: 'invalid_role' });

    expect(validRole.success).toBe(true);
    expect(invalidRole.success).toBe(false);
  });
});
