'use client';

import { ProgressProvider } from '@bprogress/next/app';
import type { ReactNode } from 'react';

import QueryClientProvider from '@/components/providers/QueryClientProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

export interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <ProgressProvider height='2px' color='currentColor' options={{ showSpinner: false }} shallowRouting>
      <QueryClientProvider>
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster richColors closeButton />
        </ThemeProvider>
      </QueryClientProvider>
    </ProgressProvider>
  );
}

export default Providers;
