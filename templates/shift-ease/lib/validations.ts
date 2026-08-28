import { z } from 'zod';

export const quoteSchema = z.object({
  fromCity: z.string().min(1),
  toCity: z.string().min(1),
  homeSize: z.string().min(1),
  inventory: z.array(z.string()).min(1),
  moveDate: z.string().min(1),
  customerName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
});

export const vendorSchema = z.object({
  companyName: z.string().min(2),
  ownerName: z.string().min(2),
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/),
  city: z.string().min(1),
  address: z.string().min(5),
  phone: z.string().min(10),
  email: z.string().email(),
  website: z.string().url().optional().or(z.literal('')),
  yearsInBusiness: z.number().min(1),
  services: z.array(z.string()).min(1),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(2),
  message: z.string().min(10),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  text: z.string().min(10),
  moveDate: z.string().min(1),
});
