import type { PostFormType } from "../schemas/postSchema";
import type { FormFieldConfig } from "../types/formBuilderTypes";

export const postConfig: FormFieldConfig<PostFormType>[] = [
  {
    name: 'caption',
    label: 'Post Caption',
    type: 'text',
    placeholder: 'Write your post caption here...',
  },
  {
    name: 'images',
    label: 'Upload Images',
    type: 'file',
    accept: 'image/*',
    placeholder: '',
    multiple: true, // allows multiple files
  },
];
