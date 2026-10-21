'use client';

import type { ComponentProps, ReactNode } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface TextFieldProps<T extends FieldValues> extends Omit<ComponentProps<typeof Input>, 'name' | 'defaultValue'> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: ReactNode;
  description?: ReactNode;
  /** Strip whitespace while typing (e.g. usernames, API keys). */
  blockSpace?: boolean;
  onValueChange?: (value: string) => void;
}

/** react-hook-form + shadcn `Input` in one component: label, control, description and error message. */
export const TextField = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  blockSpace,
  onValueChange,
  ...inputProps
}: TextFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        {label ? <FormLabel>{label}</FormLabel> : null}
        <FormControl>
          <Input
            {...inputProps}
            {...field}
            value={field.value ?? ''}
            onChange={(event) => {
              const value = blockSpace ? event.target.value.replace(/\s/g, '') : event.target.value;
              field.onChange(value);
              onValueChange?.(value);
            }}
          />
        </FormControl>
        {description ? <FormDescription>{description}</FormDescription> : null}
        <FormMessage />
      </FormItem>
    )}
  />
);
