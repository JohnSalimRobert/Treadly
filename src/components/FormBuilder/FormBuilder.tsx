// FormBuilder.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FormBuilderProps } from '../../types/formBuilderTypes';
import type { DefaultValues } from 'react-hook-form';
import toast from 'react-hot-toast';

export function FormBuilder<T extends Record<string, any>>({
  schema,
  config,
  onSubmit,
  defaultValues,
  buttonText = 'Submit',
}: FormBuilderProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>, // force-cast to satisfy RHF
  });


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {config.map((field) => (
        <div key={field.name as string} className="space-y-1">
          <label htmlFor={field.name} className="block text-sm font-medium text-threadly-text">
            {field.label}
          </label>

          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              {...register(field.name)}
              placeholder={field.placeholder}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-sm focus:border-threadly-primary focus:ring-threadly-primary"
            />
          ) : field.type === 'file' ? (
            <input
              id={field.name}
              type="file"
              accept={field.accept}
              multiple={field.multiple}
              {...register(field.name)}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-threadly-primary file:text-white hover:file:bg-threadly-primary/90"
            />
          ) : (
            <input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.name)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-sm focus:border-threadly-primary focus:ring-threadly-primary"
            />
          )}

          {errors[field.name] && (
            <p className="mt-1 text-sm text-red-600">{String(errors[field.name]?.message)}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full py-2 px-4 bg-threadly-primary text-white font-medium rounded-md hover:bg-threadly-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-threadly-primary"
      >
        {buttonText}
      </button>
    </form>
  );
}
