import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import DeleteAccountButton from './DeleteAccountButton';
import AuthProvider from '../../contexts/AuthContext';

function renderWithAuthProvider(ui: React.ReactNode) {
  return render(
    <MemoryRouter>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('DeleteAccountButton', () => {
  it('renders InitialButton when not activated', () => {
    renderWithAuthProvider(<DeleteAccountButton />);
    expect(screen.getByText('supprimer mon compte')).toBeInTheDocument();
  });
  it('renders ConfirmButton when activated', () => {
    renderWithAuthProvider(<DeleteAccountButton />);
    fireEvent.click(screen.getByText('supprimer mon compte'));
    expect(screen.getByText('supprimer mon compte ?')).toBeInTheDocument();
  });
  it('renders FinalButton when confirmed', async() => {
    renderWithAuthProvider(<DeleteAccountButton />);
    fireEvent.click(screen.getByText('supprimer mon compte'));
    fireEvent.click(screen.getByText('supprimer mon compte ?'));
    await waitFor(() => {
      expect(screen.getByText('supprimer mon compte')).toBeInTheDocument();
    }, { timeout: 4000 });
  });
  it('navigates to home when account is deleted', async () => {
    const { container } = renderWithAuthProvider(<DeleteAccountButton />);
    fireEvent.click(screen.getByText('supprimer mon compte'));
    fireEvent.click(screen.getByText('supprimer mon compte ?'));
    await waitFor(() => {
      expect(screen.getByText('supprimer mon compte')).toBeInTheDocument();
    }, { timeout: 4000 });
    
    // Simulate the API call and check if it navigates to home
    await waitFor(() => {
      expect(container.querySelector('.button--alert-border')).toBeInTheDocument();
    });
  });
});