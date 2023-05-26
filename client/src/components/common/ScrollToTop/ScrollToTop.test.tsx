import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import ScrollToTopButton from './ScrollToTop';

describe('ScrollToTopButton', () => {
  test('renders the button', () => {
    render(<ScrollToTopButton />);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('scroll-to-top');
    expect(buttonElement).toHaveClass('hidden');
  });

  test('scrolls to top when clicked', () => {
    window.scrollTo = jest.fn();

    render(<ScrollToTopButton />);

    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
