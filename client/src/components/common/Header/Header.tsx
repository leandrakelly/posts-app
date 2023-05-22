import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  name: string;
}

export const Header: React.FC<HeaderProps> = ({ name }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="header">
      <h1 className="header-title">
        Welcome
        {name ? `, ${name}` : '!'}
      </h1>
      <button className="header-logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};
