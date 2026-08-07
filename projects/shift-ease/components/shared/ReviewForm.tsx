'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  text: z.string().min(10, 'Review must be at least 10 characters'),
  moveDate: z.string().min(1, 'Please select your move date'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  companyId: string;
  onSubmit: (data: ReviewFormData) => void;
}

export default function ReviewForm({ companyId, onSubmit }: ReviewFormProps) {
  const [selectedRating, setSelectedRating] = useState(0);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  });

  const handleFormSubmit = (data: ReviewFormData) => {
    onSubmit({ ...data, rating: selectedRating });
    reset();
    setSelectedRating(0);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="heading-md font-display text-navy mb-4">Write a Review</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-navy mb-2">Your Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setSelectedRating(star)}
              className={`text-2xl ${star <= selectedRating ? 'text-yellow-400' : 'text-gray-200'}`}
              aria-label={`Rate ${star} stars`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-navy mb-1">Move Date *</label>
        <input {...register('moveDate')} type="date" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/50" />
        {errors.moveDate && <p className="text-red-500 text-sm mt-1">{errors.moveDate.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-navy mb-1">Your Review *</label>
        <textarea {...register('text')} rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/50" placeholder="Share your experience..." />
        {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>}
      </div>
      <button type="submit" className="btn-primary">Submit Review</button>
    </form>
  );
}