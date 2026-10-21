'use client';

import type { ReactNode } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

interface SwitchFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export const SwitchField = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
}: SwitchFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <div className='flex items-center justify-between gap-4'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Switch checked={!!field.value} onCheckedChange={field.onChange} disabled={disabled} />
          </FormControl>
        </div>
        {description ? <FormDescription>{description}</FormDescription> : null}
        <FormMessage />
      </FormItem>
    )}
  />
);
