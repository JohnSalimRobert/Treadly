// schemas/loginSchema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormType = z.infer<typeof loginSchema>;


export const signupSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  bio: z
    .string()
    .max(500, { message: 'Bio must be under 500 characters' })
    .optional()
    .or(z.literal('')), // allows empty string if user leaves it blank
  profilePicture: z
    .any()
    .refine(
      (file) => !file || (file instanceof FileList && file.length > 0 && file[0].type.startsWith('image/')),
      {
        message: 'Please upload a valid image file',
      }
    )
    .optional(),
});


export type SignupFormType = z.infer<typeof signupSchema>;