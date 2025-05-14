import { z } from 'zod';

export const postSchema = z.object({
  caption: z
    .string()
    .max(1000, { message: 'Caption must be under 1000 characters' }),
    images: z
    .any()
    .refine((val) => val instanceof FileList && val.length > 0, {
      message: 'At least one image is required',
    })
    .transform((val) => Array.from(val) as File[]),
  
})  as z.ZodType<{ caption: string; images: File[] }>;
export type PostFormType = z.infer<typeof postSchema>;