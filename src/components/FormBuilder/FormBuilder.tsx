import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define form type as a union of valid form keys
type FormType = "login" | "signup" | "createPost";

// Define schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});

const signupSchema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});

const createPostSchema = z.object({
  description: z.string().nonempty("Description is required"),
  image: z
    .any()
    .refine((file) => file instanceof File || file === undefined, "Invalid image file")
    .optional(),
});

const formSchemas: Record<FormType, any> = {
  login: loginSchema,
  signup: signupSchema,
  createPost: createPostSchema,
};

// Field configuration
const formFields: Record<FormType, { name: string; label: string; type: string }[]> = {
  login: [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ],
  signup: [
    { name: "username", label: "Username", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ],
  createPost: [
    { name: "description", label: "Description", type: "text" },
    { name: "image", label: "Image", type: "file" },
  ],
};

interface FormBuilderProps {
  formType: FormType;
  onSubmit: (data: any) => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ formType, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchemas[formType]),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formFields[formType].map((field, index) => (
        <div key={index} style={{ marginBottom: "15px" }}>
          <label>{field.label}</label>
          <Controller
            name={field.name as any}
            control={control}
            render={({ field: controllerField }) => {
              if (field.type === "file") {
                return (
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      controllerField.onChange(file);
                    }}
                  />
                );
              }
              return <input {...controllerField} type={field.type} />;
            }}
          />
          {errors[field.name] && (
            <span style={{ color: "red" }}>
              {(errors as any)[field.name]?.message}
            </span>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormBuilder;
