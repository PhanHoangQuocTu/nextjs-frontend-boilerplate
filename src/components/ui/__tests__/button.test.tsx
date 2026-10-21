import { render, screen } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('renders a native button by default', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('composes a single child with its variants and props', () => {
    render(
      <Button asChild variant='outline' data-testid='composed'>
        <a href='/example'>Visit</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Visit' });
    expect(link).toHaveAttribute('href', '/example');
    expect(link).toHaveAttribute('data-variant', 'outline');
    expect(link).toHaveAttribute('data-testid', 'composed');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
