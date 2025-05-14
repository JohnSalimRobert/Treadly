// types/formBuilderTypes.ts
import { z } from 'zod';
import type { DefaultValues, SubmitHandler, Path } from 'react-hook-form';

export type FieldType = 'text' | 'email' | 'password' | 'file' | 'textarea';

export interface FormFieldConfig<T> {
  name: Path<T>;
  label: string;
  type: FieldType;
  placeholder?: string;
  accept?: string;
  multiple?: boolean;
}

export interface FormBuilderProps<T extends Record<string, any>> {
  schema: z.ZodSchema<T>;
  config: FormFieldConfig<T>[];
  onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
  buttonText?: string;
}
