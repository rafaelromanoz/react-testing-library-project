import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const NEXT_POKEMON = 'Próximo pokémon';
describe('Testando o componente Pokedex.js', () => {
  it('Testa se a página contém um heading h2 com o texto Encontered Pokémons', () => {
    renderWithRouter(<App />);
    const h2Pokedex = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(h2Pokedex).toBeInTheDocument();
  });
  it('testa se ao clicar no próximo pokemon', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', {
      name: NEXT_POKEMON,
    });
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const chamander = screen.getByText('Charmander');
    expect(chamander).toBeInTheDocument();

    const numberOfClicks = 7;
    for (let i = 0; i < numberOfClicks; i += 1) {
      userEvent.click(nextPokemon);
    }
    const dragoNair = screen.getByText('Dragonair');
    expect(dragoNair).toBeInTheDocument();

    userEvent.click(nextPokemon);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
  it('Teste se tem o botão de tipo', () => {
    renderWithRouter(<App />);
    const typeButton = screen.getByRole('button', {
      name: 'Fire',
    });
    expect(typeButton).toBeInTheDocument();
  });
  it('Teste se depois do all tem o pickachu', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', {
      name: 'All',
    });
    userEvent.click(buttonAll);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
  it('Verifica se existe só um pokemon na tela', () => {
    renderWithRouter(<App />);
    const poke = screen.getByText('Pikachu');
    expect(poke).toBeInTheDocument();

    const nextPokemon = screen.getByRole('button', {
      name: NEXT_POKEMON,
    });
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
    expect(poke.textContent).not.toEqual('Pikachu');
  });
  it('Ver testID', () => {
    renderWithRouter(<App />);
    const NUMBER_OF_BUTTONS = 7;
    const typeId = screen.getAllByTestId('pokemon-type-button');
    expect(typeId.length).toEqual(NUMBER_OF_BUTTONS);
  });
});
