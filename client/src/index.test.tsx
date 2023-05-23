import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { RelayEnvironment } from './relay/RelayEnvironment';

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
  const div = document.createElement('div');
  ReactDOM.render(
    <React.StrictMode>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RelayEnvironmentProvider>
    </React.StrictMode>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
  expect(document.body).toBeInTheDocument();
});
