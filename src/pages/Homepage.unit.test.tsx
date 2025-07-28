import { describe, expect, it } from "vitest";
import { MemoryRouter } from 'react-router';
import AuthProvider from "../contexts/AuthContext";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Homepage from "./Homepage";
import { HelmetProvider } from "react-helmet-async";
import Explain from "../components/HomePage/Explain";

// Custom function to use AuthProvider in tests
function renderWithAuthProvider(homepage: React.ReactNode) {
  return render(
    // Memory router is used to simulate routing in tests
    <MemoryRouter>
      {/* HelmetProvider is used to manage document head */}
      <HelmetProvider>
        {/* Wrap the homepage component with AuthProvider for context */}
        <AuthProvider>
          {homepage}
        </AuthProvider>
      </HelmetProvider>
    </MemoryRouter>
  );
}

describe('HeroBanner', () => {
  it("renders HeroBanner when not authenticated", () => {
    const { getByText } = renderWithAuthProvider(<Homepage />);
    expect(getByText("Prêt à prouver ton skill au monde entier ?")).toBeInTheDocument();
  });
})

describe ('PopularChallenges', () => {
  it('renders PopularChallenges section', () => {
    const { getByText } = renderWithAuthProvider(<Homepage />);
    expect(getByText("challenges populaires")).toBeInTheDocument();
  });

  it('renders ChallengeCards', async () => {
    const { getByText, container } = renderWithAuthProvider(<Homepage />);
    // waitFor ensures that the component has finished rendering before checking
    await waitFor(() => {
      expect(getByText("Prêt à prouver ton skill au monde entier ?")).toBeInTheDocument();
      const cards = container.querySelectorAll('.challenge-card');
      expect(cards.length).toEqual(5);
    });
  });

  it('simulates clicks on challenge card', async () => {
    const { getByText, container } = renderWithAuthProvider(<Homepage />);
    await waitFor(() => {
      expect(getByText("Prêt à prouver ton skill au monde entier ?")).toBeInTheDocument();
      const cards = container.querySelectorAll('.challenge-card');
      let counter = 0;
      for(const card of cards) {
        fireEvent.click(card);
        counter++;
      }
      expect(counter).toEqual(5);
    });
  });
});

describe('Explain', () => {
  it('renders Explain section', () => {
    const { getByText } = renderWithAuthProvider(<Explain />);
    expect(getByText("comment participer ?")).toBeInTheDocument();
  });

  it('renders buttons in Explain section', () => {
    const { getByText } = renderWithAuthProvider(<Explain />);
    expect(getByText("voir les challenges")).toBeInTheDocument();
    expect(getByText("voir les participations")).toBeInTheDocument();
    expect(getByText("voir le leaderboard")).toBeInTheDocument();
  });
});

describe('LastParticipatons', () => {
  it('renders LastParticipatons section', () => {
    const { getByText } = renderWithAuthProvider(<Homepage />);
    expect(getByText("les dernières participations")).toBeInTheDocument();
  });

  it('renders ParticipationCard components', async () => {
    const { getByText, container } = renderWithAuthProvider(<Homepage />);
    await waitFor(() => {
      expect(getByText("les dernières participations")).toBeInTheDocument();
      const cards = container.querySelectorAll('.participation-card');
      expect(cards.length).toEqual(6);
    });
  });
});