import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';

describe('Dashboard Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  };

  it('renders dashboard title', () => {
    localStorage.setItem('role', 'admin');
    renderDashboard();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('shows admin-specific cards when user is admin', () => {
    localStorage.setItem('role', 'admin');
    renderDashboard();
    
    expect(screen.getByText('Manage Patients')).toBeInTheDocument();
    expect(screen.getByText('Add Patient')).toBeInTheDocument();
    expect(screen.getByText('Manage Medications')).toBeInTheDocument();
    expect(screen.getByText('Create User')).toBeInTheDocument();
  });

  it('shows doctor-specific cards when user is doctor', () => {
    localStorage.setItem('role', 'doctor');
    renderDashboard();
    
    expect(screen.getByText('My Patients')).toBeInTheDocument();
    expect(screen.getByText('Add Patient')).toBeInTheDocument();
  });

  it('displays welcome message with role', () => {
    localStorage.setItem('role', 'admin');
    renderDashboard();
    expect(screen.getByText(/Welcome, Administrator/i)).toBeInTheDocument();
  });
});

