'use client';

import type { ReactNode } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface CheckboxFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export const CheckboxField = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
}: CheckboxFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <div className='flex items-center gap-2'>
          <FormControl>
            <Checkbox checked={!!field.value} onCheckedChange={field.onChange} disabled={disabled} />
          </FormControl>
          <FormLabel>{label}</FormLabel>
        </div>
        {description ? <FormDescription>{description}</FormDescription> : null}
        <FormMessage />
      </FormItem>
    )}
  />
);
