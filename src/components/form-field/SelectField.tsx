'use client';

import type { ReactNode } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { IOption } from '@/types/type';

interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  options: IOption<string>[];
  label?: ReactNode;
  description?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

export const SelectField = <T extends FieldValues>({
  control,
  name,
  options,
  label,
  description,
  placeholder,
  disabled,
  onValueChange,
}: SelectFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        {label ? <FormLabel>{label}</FormLabel> : null}
        <Select
          disabled={disabled}
          value={field.value ?? ''}
          onValueChange={(value) => {
            field.onChange(value);
            onValueChange?.(value);
          }}
        >
          <FormControl>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {description ? <FormDescription>{description}</FormDescription> : null}
        <FormMessage />
      </FormItem>
    )}
  />
);
