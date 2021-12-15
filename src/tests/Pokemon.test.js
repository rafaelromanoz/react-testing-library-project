import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Requisito 6', () => {
  it('Caso tenha pokemons favoritados, eles devem ser renderizados na tela', () => {
    const { history } = renderWithRouter(<App />);
    const pikachuName = screen.getByTestId('pokemon-name');
    expect(pikachuName).toBeInTheDocument();
    expect(pikachuName).toHaveTextContent('Pikachu');
    const pikachuType = screen.getByTestId('pokemon-type');
    expect(pikachuType).toBeInTheDocument();
    expect(pikachuType).toHaveTextContent('Electric');
    const pikachuWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pikachuWeight).toBeInTheDocument();
    const pikachuImg = screen.getByAltText('Pikachu sprite');
    expect(pikachuImg).toBeInTheDocument();
    expect(pikachuImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    const moreDetails = screen.getByRole('link', {
      name: 'More details',
    });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Verifica se ao clicar no favorito ele favorita', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    userEvent.click(moreDetails);
    const input = screen.getByRole('checkbox');
    userEvent.click(input);
    const home = screen.getByText('Home');
    userEvent.click(home);
    const svg = screen.getByAltText('Pikachu is marked as favorite');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('src', '/star-icon.svg');
  });
});
