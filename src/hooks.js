import { useState, useEffect } from "react";
import {
  fetchPokemons,
  fetchPokemonByName,
  fetchPokemonGames
} from "./api/pokeapi";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchPokemons()
      .then(pokemon => {
        setPokemons(pokemon);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return [pokemons, loading, error];
};

const usePokemon = name => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setPokemon(null);
    setLoading(true);

    fetchPokemonByName(name)
      .then(pokemon => {
        if (cancelled) return;

        setPokemon(pokemon);
        setLoading(false);
      })
      .catch(error => {
        if (cancelled) return;

        setError(error);
        setLoading(false);
      });

    return () => (cancelled = true);
  }, [name]);

  return [pokemon, loading, error];
};

const usePokemonGames = pokemon => {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setGames(null);
    setLoading(true);

    fetchPokemonGames(pokemon.game_indices.map(game => game.version.name))
      .then(games => {
        if (cancelled) return;

        setGames(games);
        setLoading(false);
      })
      .catch(error => {
        if (cancelled) return;

        setError(error);
        setLoading(false);
      });

    return () => (cancelled = true);
  }, [pokemon]);

  return [games, loading, error];
};

export { usePokemons, usePokemon, usePokemonGames };
