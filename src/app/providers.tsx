import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { FilterProvider } from '../context/FilterContext';
import { ToastProvider } from '../context/ToastContext';
import { AuthProvider } from '../context/AuthContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <FilterProvider>
        <ToastProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ToastProvider>
      </FilterProvider>
    </ThemeProvider>
  );
};
