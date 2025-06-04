import { CustomButton } from '../../components/CustomButton';
import { expect, it, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

describe('Button', () => {
  it('renders with children', () => {
    render(<CustomButton>Click</CustomButton>);
    screen.debug();
  });

  it('renders with children', () => {
    render(<CustomButton>Click</CustomButton>);
    expect(screen.getByText('Click')).toBeInTheDocument();
  });
});
