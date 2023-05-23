import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Login } from './Login';
import { RelayEnvironmentProvider } from 'react-relay';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { MemoryRouter } from 'react-router-dom';

describe('Login', () => {
  let mockEnvironment: ReturnType<typeof createMockEnvironment>;

  beforeEach(() => {
    mockEnvironment = createMockEnvironment();
    mockEnvironment.mock.queueOperationResolver((operation: any) =>
      MockPayloadGenerator.generate(operation)
    );
    jest
      .spyOn(window.localStorage.__proto__, 'setItem')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    // Cleanup the mock environment after each test
    mockEnvironment.mockClear();
  });

  test('renders without crashing', () => {
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
          <Login />
        </MemoryRouter>
      </RelayEnvironmentProvider>
    );
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  test('allows the user to login', async () => {
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
          <Login />
        </MemoryRouter>
      </RelayEnvironmentProvider>
    );
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByTestId('login-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);

      expect((emailInput as HTMLInputElement).value).toBe('test@example.com');
      expect((passwordInput as HTMLInputElement).value).toBe('password123');
    });
  });
});
