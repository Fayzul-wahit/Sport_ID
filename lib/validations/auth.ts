import { z } from 'zod';

export const contactSchema = z.object({
  contact: z.string().min(3, 'Please enter a valid mobile number or email address'),
  role: z.enum(['athlete', 'org_rep', 'admin']),
});

export const otpSchema = z.object({
  contact: z.string(),
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
  role: z.enum(['athlete', 'org_rep', 'admin']),
  language: z.enum(['en', 'ta', 'ml']),
});
