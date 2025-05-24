import type { CommentFormType } from "../schemas/commentSchema";
import type { FormFieldConfig } from "../types/formBuilderTypes";

export const commentConfig: FormFieldConfig<CommentFormType>[] = [
  {
    name: 'content',
    label: 'Add a Comment',
    type: 'textarea',
    placeholder: 'Write something...',
  },
];