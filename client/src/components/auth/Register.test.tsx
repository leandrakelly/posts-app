import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';
import { RelayEnvironmentProvider } from 'react-relay';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { MemoryRouter } from 'react-router-dom';

describe('Register', () => {
  let mockEnvironment: ReturnType<typeof createMockEnvironment>;

  beforeEach(() => {
    mockEnvironment = createMockEnvironment();
    mockEnvironment.mock.queueOperationResolver((operation: any) =>
      MockPayloadGenerator.generate(operation)
    );
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
  });

  afterEach(() => {
    // Cleanup the mock environment after each test
    mockEnvironment.mockClear();
  });

  test('allows the user to register', async () => {
    render(
      <RelayEnvironmentProvider environment={mockEnvironment}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </RelayEnvironmentProvider>
    );

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const registerButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect((nameInput as HTMLInputElement).value).toBe('John Doe');
      expect((emailInput as HTMLInputElement).value).toBe('test@example.com');
      expect((passwordInput as HTMLInputElement).value).toBe('password123');
      expect(
        screen.getByText('User created successfully!')
      ).toBeInTheDocument();
    });
  });
});
