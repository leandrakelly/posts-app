import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { App } from './App';
import { MemoryRouter } from 'react-router-dom';
import { RelayEnvironmentProvider } from 'react-relay';
import { createMockEnvironment } from 'relay-test-utils';

describe('App', () => {
  const mockEnvironment = createMockEnvironment();
  it('renders without crashing', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    render(
      <RelayEnvironmentProvider environment={mockEnvironment}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </RelayEnvironmentProvider>
    );

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });
});
