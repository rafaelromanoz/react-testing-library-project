import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste favorite pokemons ', () => {
  it('Verifica se ao clicar no favorito ele favorita', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    userEvent.click(moreDetails);
    const nameDetails = screen.getByText('Pikachu Details');
    expect(nameDetails).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
  });
});
