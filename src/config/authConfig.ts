import type { LoginFormType, SignupFormType } from "../schemas/authSchema";
import type { FormFieldConfig } from "../types/formBuilderTypes";

export const loginConfig: FormFieldConfig<LoginFormType>[] = [
  {
    name: 'email', // must be literal 'email'
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    name: 'password', // must be literal 'password'
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
];

export const signupConfig: FormFieldConfig<SignupFormType>[] = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'Your Username',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '********',
  },
  {
    name: 'bio',
    label: 'Bio',
    type: 'textarea',
    placeholder: 'Tell us a bit about yourself...',
  },
  {
    name: 'profilePicture',
    label: 'Profile Picture',
    type: 'file',
    accept: 'image/*',
    multiple: false ,
    placeholder: '',
  },
];
