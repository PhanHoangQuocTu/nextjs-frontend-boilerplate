export const VALIDATION_MESSAGES = {
  REQUIRED: (field?: string) => (field ? `${field} is required` : 'Please fill out this field'),
  INVALID: (field: string) => `${field} is invalid`,
  MAX_LENGTH: (field: string, max: number) => `${field} can not exceed ${max} characters`,
  MIN_LENGTH: (field: string, min: number) => `${field} must be at least ${min} characters long`,
  INVALID_FORMAT: (field: string) => `Invalid ${field} format. Please check it again`,
} as const;
