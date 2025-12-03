import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Navbar Component', () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  it('renders CareStack Clinic logo and title', () => {
    renderNavbar();
    expect(screen.getByText('CareStack Clinic')).toBeInTheDocument();
  });

  it('shows public navigation links when user is not logged in', () => {
    renderNavbar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Doctor Signup')).toBeInTheDocument();
    expect(screen.getByText('Caregiver Signup')).toBeInTheDocument();
  });

  it('shows admin navigation links when user is admin', () => {
    localStorage.setItem('role', 'admin');
    renderNavbar();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Patients')).toBeInTheDocument();
    expect(screen.getByText('Add Patient')).toBeInTheDocument();
    expect(screen.getByText('Create User')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('shows doctor navigation links when user is doctor', () => {
    localStorage.setItem('role', 'doctor');
    renderNavbar();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('My Patients')).toBeInTheDocument();
    expect(screen.getByText('Add Patient')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('calls logout handler when Sign Out is clicked', async () => {
    const { user } = await import('@testing-library/user-event');
    localStorage.setItem('role', 'admin');
    localStorage.setItem('token', 'test-token');
    
    renderNavbar();
    
    const signOutButton = screen.getByText('Sign Out');
    await user.click(signOutButton);
    
    expect(localStorage.getItem('token')).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});

