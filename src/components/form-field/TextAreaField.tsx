'use client';

import type { ComponentProps, ReactNode } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface TextAreaFieldProps<T extends FieldValues>
  extends Omit<ComponentProps<typeof Textarea>, 'name' | 'defaultValue'> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: ReactNode;
  description?: ReactNode;
}

export const TextAreaField = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  ...props
}: TextAreaFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        {label ? <FormLabel>{label}</FormLabel> : null}
        <FormControl>
          <Textarea {...props} {...field} value={field.value ?? ''} />
        </FormControl>
        {description ? <FormDescription>{description}</FormDescription> : null}
        <FormMessage />
      </FormItem>
    )}
  />
);
