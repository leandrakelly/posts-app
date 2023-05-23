import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import * as router from 'react-router';

const localStorageMock = {
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Header', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  test('renders the header', () => {
    const name = 'John';
    render(<Header name={name} />);
    const header = screen.getByRole('heading', { name: /welcome/i });
    expect(header).toBeInTheDocument();
  });

  test('renders the header with no name', () => {
    render(<Header name="" />);
    const header = screen.getByRole('heading', { name: /welcome/i });
    expect(header).toBeInTheDocument();
  });

  test('logs out and navigates to login page', () => {
    const name = 'John';
    render(<Header name={name} />);

    const logoutButton = screen.getByRole('button', { name: /logout/i });

    fireEvent.click(logoutButton);

    expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/login');
  });
});
